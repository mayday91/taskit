//////////////Import Dependencies////////
const mongoose = require('./connection')
const List = require('./list')
const Task = require('./task')

const db = mongoose.connection

//////////////Seed Code/////////////////

db.on('open', () => {
    // array of starter lists and tasks
    const startLists = [
        {
            title: "Shopping List",
            body: ["Bananas", "Strawberries", "Grapes", "Bread", "Oil", "Eggs", "Bacon"],
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
            },{
            timestamps: true
            },{
            tags: ["Groceries, Shopping, Food, Fruit"]
            }
      ]
    const startTasks = [{
        task: "Clean litter box",
        completed: false,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        },{
        timestamps: true
        }]
      // when we seed data we usually clear out the db first
    List.remove({})
    .then(deletedLists => {
        console.log('this is what remove returns', deletedLists)
        // now that our delete was successful we can create our fruits
            List.create(startLists)
            .then(data => {
                console.log('the new tasks', data)
                db.close()
            })
            .catch(error => {
                console.log('error:', error)
                db.close()
            })
        })
        .catch(error => {
            console.log('error:', error)
            db.close
        })
    Task.remove({})
    // then create that data
    .then(deletedTasks => {
        console.log('this is what remove returns', deletedTasks)
        // now that our delete was successful we can create our fruits
            Task.create(startTasks)
            .then(data => {
                console.log('the new tasks', data)
                db.close()
            })
            .catch(error => {
                console.log('error:', error)
                db.close()
            })
        })
        .catch(error => {
            console.log('error:', error)
            db.close
        })
      // whether its successful or not we want to close our db connection
})