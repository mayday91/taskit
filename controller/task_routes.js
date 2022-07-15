const express = require('express')
const router = express.Router()
// importing task model to access database
const Task = require('../models/task.js')


// DELETE route
router.delete('/:id', (req, res) => {
    const taskId = req.params.id
    Task.findByIdAndRemove(taskId)
    .then(task => {
        res.redirect('/tasks')
    })
    .catch(err => {
        res.json(err)
    })
})

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const taskId = req.params.id
    Task.findById(taskId)
        .then(task => {
            res.render('tasks/edit', { task })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update route
router.put('/:id', (req, res) => {
    const taskId = req.params.id

    req.body.completed = req.body.completed === 'on' ? true : false

    Task.findByIdAndUpdate(taskId, req.body, { new: true })
        .then(task => {
            res.redirect(`/tasks/mine`)
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    res.render('tasks/new')
})

// POST - Create
router.post('/', (req, res) => {
    req.body.completed = req.body.completed === 'on' ? true : false
    req.body.owner = req.session.userId
    Task.create(req.body)
    .then(task => {
        res.redirect('/tasks')
    })
    .catch(err => {
        res.json(err)
    })
})

// GET - Index
router.get('/', (req, res) => {
    Task.find({})
    .then(tasks => {
        res.redirect('tasks/mine')
    })
    .catch(err => {
        res.json(err)
    })
})


// GET - Current User Tasks
router.get('/mine', (req, res) => {
    Task.find({ owner: req.session.userId})
    .then(tasks => {
        console.log(req.session.username)
        const user = req.session.username
        res.render('tasks/index', { user, tasks })
    })
    .catch(error => {
        console.log(error)
        res.json(error)
    })
})

// GET- Show
router.get('/:id', (req, res) => {
    const taskId = req.params.id
    Task.findById(taskId)
    .populate('comments.author')
    .then(task => {
        const userId = req.session.userId
        const username = req.session.username
        res.render('tasks/show', { task, userId, username })
    })
    .catch(err => {
        res.json(err)
    })
})


router.get('/tasks', (req, res) => {
    res.send('Task Page')
})

module.exports = router