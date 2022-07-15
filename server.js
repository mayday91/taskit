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





const taskRoutes = require('./controller/task_routes')

const userRoutes = require('./controller/user_routes')

const commentRoutes = require('./controller/comment_routes')

const app = require('liquid-express-views')(express())


// Middleware

// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))

app.use(cors())

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
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false,

	})	
)

// Routes

app.get('/',  (req, res) => {
	res.redirect('/tasks/mine')
})


app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)



// Server Listener

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})


/// 4/0AdQt8qhiwYczkUHzHPX-6fcAu8jHftsnDEcNv0RLZ9T03x5kAS4-_QkkMsBoctrtlQaW3A
