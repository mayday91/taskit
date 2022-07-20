// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { google } = require('googleapis')
const request = require("request")
const cors = require('cors')
const urlParse = require('url-parse')
const queryParse = require('query-string')
const bodyParser = require('body-parser')
const axios = require('axios')
const { OAuth2Client } =  require('google-auth-library')
let authentication = require("./authentication")
const Task = require('./models/task.js')






const taskRoutes = require('./controller/task_routes')

const userRoutes = require('./controller/user_routes')

const commentRoutes = require('./controller/comment_routes')

const app = require('liquid-express-views')(express())


// Middleware

// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

app.use(cors())

app.use(express.json())
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// to serve files from public statically
app.use(express.static('public'))

// bring in session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')

// middleware that sets up sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI
		}),
		saveUninitialized: true,
		resave: false,

	})	
)

// Routes

app.get('/',  (req, res) => {
	res.redirect('/users/login')
})

app.post('/getTasks', async (req, res) => {
	let payload = req.body.payload.trim();
	let search = await Task.find({name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
	res.send({payload: search})
	console.log(payload)
})


app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)



// Server Listener

const PORT = process.env.PORT
app.listen((process.env.PORT || 3000), () => {
	console.log(`app is listening on port: ${PORT}`)
})


/// 4/0AdQt8qhiwYczkUHzHPX-6fcAu8jHftsnDEcNv0RLZ9T03x5kAS4-_QkkMsBoctrtlQaW3A
