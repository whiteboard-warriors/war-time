require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const app = express()

const PORT = process.env.PORT || 5005

console.info('PORT: ' + process.env.PORT)
console.info('NODE_ENV: ' + process.env.NODE_ENV)
console.log('MONGO: ' + process.env.MONGODB_URI)
console.log('MONGO: ' + process.env.AWS_SES_KEY)
console.log('MONGO: ' + process.env.AWS_SES_SECRET)
// Define middleware here

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
	session({
		secret: 'war time',
		resave: true,
		saveUninitialized: true,
		// cookie: { secure: true }
	})
)
app.use(passport.initialize())
require('./config/passport')(passport)
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('/*', (req, res) => {
		res.sendFile(process.cwd() + '/client/build/index.html')
	})
}

// Add routes, both API and view
app.use(
	'/api/users',
	passport.authenticate('jwt', { session: false }),
	require('./routes/users')
)
app.use(
	'/api/events',
	passport.authenticate('jwt', { session: false }),
	require('./routes/events')
)
app.use(
	'/api/events/admin',
	passport.authenticate('jwt', { session: false }),
	require('./routes/eventAdmin')
)
app.use(
	'/api/events/pair',
	passport.authenticate('jwt', { session: false }),
	require('./routes/eventPairing')
)
app.use('/api/auth', require('./routes/auth'))
app.use(
	'/api/locations',
	passport.authenticate('jwt', { session: false }),
	require('./routes/locations')
)
app.use(
	'/api/languages',
	passport.authenticate('jwt', { session: false }),
	require('./routes/languages')
)

// Connect to the Mongo DB
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/war-time', {
	useNewUrlParser: true,
	useFindAndModify: false,
})

// Start the API server
let server = app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

// attach socket to the node server
var io = require('socket.io').listen(server)
require('./middleware/socket')(io)
