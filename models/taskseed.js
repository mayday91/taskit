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
        { name: "Clean Kitchen", importance: 6, completed: true },
        { name: "Clean out garage", importance: 3, completed: false },
        { name: "Fix car", importance: 8, completed: false },
        { name: "Finish old hw", importance: 10, completed: true },
        { name: "Take bike to shop", importance: 5, completed: false },
        { name: "Paint office", importance: 7, completed: false },
        { name: "Put together desk", importance: 7, completed: false },
        { name: "Call insurance company", importance: 9, completed: true },
        { name: "Make iced coffee for morning", importance: 10, completed: true },
        { name: "Plan vacation for after school", importance: 6, completed: false },
      ]
      // clear out the db first
    Task.remove({})
    // then create the new seed data
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