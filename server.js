/////////////////////////////////
/// import dependencies

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')

/// Requiring routes
const listRoutes = require('./controllers/list_routes')
const userRoutes = require('./controllers/user_routes')
const taskRoutes = require('./controllers/task_routes')


const app = require('liquid-express-views')(express())
/// Middleware
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
// session middleware
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


/// Routes
app.get('/', (req, res) => {
	res.redirect('/users/login')
})

app.use('/lists', listRoutes)
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})
