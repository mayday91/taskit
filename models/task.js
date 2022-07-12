
const { Schema, model } = mongoose

const taskSchema = new Schema({
event: String,
completed: Boolean,
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
},{
timestamps: true
})

const Note = model('Note', noteSchema)

module.exports = Note