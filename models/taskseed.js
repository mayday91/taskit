//////////////Import Dependencies////////
const mongoose = require('./connection')
const Task = require('./task')

const db = mongoose.connection

//////////////Seed Code/////////////////

db.on('open', () => {
    // array of starter lists and tasks
    const startTasks = [
        {   
            task: "Do Laundry",
            completed: false,
            // author: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // },
            },{
            timestamps: true
        }, {   
            task: "Wash Dishes",
            completed: true,
            // author: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // },
            },{
            timestamps: true
        }
      ]
      // when we seed data we usually clear out the db first
    Task.remove({})
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
      // whether its successful or not we want to close our db connection
})
})