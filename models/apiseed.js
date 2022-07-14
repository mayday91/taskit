//////////////Import Dependencies////////
const mongoose = require('./connection')
const List = require('./list')

const db = mongoose.connection

//////////////Seed Code/////////////////

db.on('open', () => {
    // array of starter lists and tasks
    const startLists = [
        {
            title: "Shopping List",
            body: ["Bananas", "Strawberries", "Grapes", "Bread", "Oil", "Eggs", "Bacon"],
            // author: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'User'
            // }
            },{
            timestamps: true
            },{
            tags: ["Groceries, Shopping, Food, Fruit"]
            }, {
            title: "Date Ideas",
            body: ["Movies", "Picnic", "Dinner", "Skydiving"],
                // author: {
                //     type: Schema.Types.ObjectId,
                //     ref: 'User'
                // }
            },{
            timestamps: true
            },{
            tags: ["Fun", "Date", "Ideas"]
            }
      ]
      // when we seed data we usually clear out the db first
    List.remove({})
    .then(deletedLists => {
        console.log('this is what remove returns', deletedLists)
        // now that our delete was successful we can create our fruits
            List.create(startLists)
            .then(data => {
                console.log('the new lists', data)
                db.close()
            })
            .catch(error => {
                console.log('error:', error)
                db.close()
            })
      // whether its successful or not we want to close our db connection
})
})

fetch(APIrequestUrl)
    .then(res => res.json())
    .then(data => {
        const APIdata = data.items
        // console.log('data here-->', data)
        console.log(APIdata)
        //when we seed data, we usualy clear the db first
        Event.deleteMany({})
        //then we create the data
            .then(deletedEvents => {
                console.log('this is what remove returns', deletedEvents)

                //now that our delete was succesfull, we can create our fruits
                Event.create(APIdata)
                    .then(data => {
                        console.log('New data', data)
                        db.close()
                    })
                    .catch(error => {
                        console.log('error', error)
                        db.close()
                    })
            })
            .catch(error => {
                console.log('error', error)
                db.close()
            })
             // whether it's succesful or not we want to close our db connection
        })
    .catch(err => console.log(err.json()))