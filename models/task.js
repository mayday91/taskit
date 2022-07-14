// using already connected mongoose not a new one from node_modules
const mongoose = require('./connection')
const commentSchema = require("./comment")
// inside mongoose I want the keys named Schema and model
const { Schema, model } = mongoose 

const taskSchema = new Schema({
    name: String,
    importance: Number,
    completed: Boolean,
    owner: {
        type: Schema.Types.ObjectId, // a single user ._id
        ref: "User", // const User = model('User', userSchema) the string of User is how we reference a model
    },
    comments: [commentSchema]
}, {
    timestamps: true
}) 

// need to make a model
// this collection will be called fruits
const Task = model('Task', taskSchema)

module.exports = Task