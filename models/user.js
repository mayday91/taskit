//////////////Import Dependencies////////
const mongoose = require('./connection')

const { Schema, model } = mongoose

/// User Schema
const userSchema = new Schema({
    username: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true    
    }
})

/// make a user model with userSchema
const User = model('User', userSchema)

/// export to user model
module.exports = User