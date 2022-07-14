//////////Import Dependencies & Models///////
const express = require('express')
const router = express.Router()
const Task = require('../models/task.js')

/// POST - Comment Create
router.post('/:taskId', (req, res) => {
    const taskId = req.params.taskId
    req.body.author = req.body.userId

    Task.findById(taskId)
    .then(task => {
        task.comments.push(req.body)
        console.log('this is the comment', req.body)
        return task.save()
    })
    .then(task => {
        res.redirect(`/tasks/${task._id}`)
    })
    .catch(err => {
        res.json(err)
    })
})


/// DELETE - Comment Delete
router.delete('/delete/:taskId/:commentId', (req, res) => {
    const taskId = req.params.taskId
    const commentId = req.params.commentId
    Task.findById(taskId)
    .then(task => {
        const comment = task.comments.id(commentId)
        comment.remove()
        return task.save()
    })
    .then(task => {
        res.redirect(`/tasks/${taskId}`)
    })
    .catch(err => {
        console.log(err)
    })
   
})

module.exports = router