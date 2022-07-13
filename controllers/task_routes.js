const express = require('express')
const router = express.Router()

// importing task and list models to access database
const Task = require('../models/task.js')

// GET - Index
// localhost:3000/tasks
router.get('/', (req, res) => {
    // mongoose to find all tasks
    Task.find({})
    .then(tasks => {
        res.render('tasks', { tasks })
    })
    .catch(err => {
        res.json(err)
    })
})



module.exports = router