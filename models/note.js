
const { Schema, model } = mongoose

const noteSchema = new Schema({
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

const Note = model('Note', noteSchema)

module.exports = Note