//////////////Import Dependencies////////
const { Schema } = require('mongoose')
const mongoose = require('./connection')

const commentSchema = new mongoose.Schema({
    note:{
        type: String, required: true
    }, 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User' // string value from model creation
    }
},{
    timestamps: true
})

module.exports = commentSchema