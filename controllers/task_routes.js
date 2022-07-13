const express = require('express')
const router = express.Router()

// importing task and list models to access database
const List = require('../models/list.js')
const Task = require('../models/task.js')







router.get('/fruits', (req, res) => {
    res.send('Fruits Page')
})

module.exports = router