// import dependencies
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { google } = require('googleapis')
// const request = require('request')
const cors = require('cors')
const urlParse = require('url-parse')
const queryParse = require('query-string')
const bodyParser = require('body-parser')
const axios = require('axios')




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

app.get('/', (req, res) => {
	// const oauth2client = new google.auth.OAuth2(
	// 	//client ID
	// 	"687924894964-27t117nuvjrkt7rd86m4u79gtsokp50q.apps.googleusercontent.com",
	// 	// client secret
	// 	"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",
	// 	// redirect link
	// 	"http://localhost:3001/tasks"
	// 	)
	// const scopes = ["https://www.googleapis.com/auth/tasks"]

	// const url = oauth2client.generateAuthUrl({
	// 	access_type: "offline",
	// 	scope: scopes,
	// 	state: JSON.stringify({
	// 		callbackUrl: req.body.callbackUrl,
	// 		userID: req.body.userid
	// 	})
	// })
	// request(url, (err, response, body) => {
	// 	console.log("error", err);
	// 	console.log('statusCode: ', response && response.statusCode);
	// 	res.send({ url })
	// })
	res.redirect('/tasks')
})
app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)
app.use('/comments', commentRoutes)



// Server Listener

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})
