// requiring .env package
require('dotenv').config()
// requiring mongoose
const mongoose = require('mongoose')

const DATABASE_URI = process.env.DATABASE_URI

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// connecting mongoDB to mongoose
mongoose.connect(DATABASE_URI, config)

mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', err => console.error("this is the error", err))

module.exports = mongoose