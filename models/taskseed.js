///// This file runs on npm run seed


//////////////Import Dependencies////////
const mongoose = require('./connection')
const Task = require('./task')

//////////////Seed Code/////////////////
// save my db connection to variable for easy reference
const db = mongoose.connection

// this runs callback function when db connection is opened from this file
db.on('open', () => {
    // array of starter tasks
    const startTasks = [
        { name: "Orange", importance: 8, completed: true },
        { name: "Grape", importance: 8, completed: true },
        { name: "Banana", importance: 8, completed: false },
        { name: "Strawberry", importance: 8, completed: true },
        { name: "Coconut", importance: 8, completed: false },
      ]
      // when we seed data we usually clear out the db first
    Task.remove({})
    // then create that data
    .then(deletedTasks => {
        console.log('this is what remove returns', deletedTasks)
        // now that our delete was successful we can create our tasks
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