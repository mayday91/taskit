
const { Schema, model } = mongoose

const taskSchema = new Schema({
task: String,
completed: Boolean,
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
},{
timestamps: true
})

const Task = model('Task', taskSchema)

module.exports = Task