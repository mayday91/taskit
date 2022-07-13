const express = require('express')
const router = express.Router()

// importing task model to access database
const List = require('../models/list.js')


// GET - Index
// localhost:3000/lists
router.get('/', (req, res) => {
    // mongoose to find all fruits
    List.find({})
    // return fruits as json
    .then(lists => {
        // res.json(fruit)
        res.render('lists', { lists })
    })
    .catch(err => {
        res.json(err)
    })
})


// router.get('/lists', (req, res) => {
//     res.send('Lists')
// })

module.exports = router