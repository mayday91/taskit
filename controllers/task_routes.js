const express = require('express')
const router = express.Router()

// importing task and list models to access database
const Task = require('../models/task.js')

// GET - Index
// localhost:3000/tasks
router.get('/', (req, res) => {
    // mongoose to find all tasks
    req.body.completed = req.body.completed === 'on' ? true : false
    Task.find({})
    .then(tasks => {
        res.render('tasks', { tasks })
    })
    .catch(err => {
        res.json(err)
    })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const taskId = req.params.id
    console.log(req.params.id)
    Task.findById(taskId)
        .then(task => {
            res.render('tasks/edit', { task })
        })
        .catch(err => {
            res.json(err)
        })
})


// PUT - Update
router.put('/:id', (req, res) => {
    const taskId = req.params.id

    req.body.completed = req.body.completed === 'on' ? true : false

    Task.findByIdAndUpdate(taskId, req.body, { new: true })
        .then(task => {
            res.redirect(`/tasks`)
        })
        .catch(err => {
            res.json(err)
        })
})



module.exports = router