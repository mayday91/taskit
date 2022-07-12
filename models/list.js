
const { Schema, model } = mongoose

const listSchema = new Schema({
title: String,
body: String,
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
},{
timestamps: true
},{
tags: [""]
})

const List = model('List', listSchema)

module.exports = Note