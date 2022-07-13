const mongoose = require('./connection')

const { Schema, model } = mongoose

const listSchema = new Schema({
title: String,
body: [""],
// author: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
// }
},{
timestamps: true
},{
tags: [""]
})

const List = model('List', listSchema)

module.exports = List