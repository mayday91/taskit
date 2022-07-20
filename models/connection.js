// requiring .env package
require('dotenv').config()
// requiring mongoose
const mongoose = require('mongoose')

const DATABASE_URI = process.env.DATABASE_URI

// const config = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }

// // connecting mongoDB to mongoose
// mongoose.connect(DATABASE_URI, config)

// mongoose.connection
//     .on('open', () => console.log('Connected to Mongoose'))
//     .on('close', () => console.log('Disconnected from Mongoose'))
//     .on('error', err => console.error("this is the error", err))

// Fire off the connection to Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.log("Could not connect to MongoDB!", err);
  });

module.exports = mongoose