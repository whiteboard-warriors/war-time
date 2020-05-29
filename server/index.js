const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const app = express();

const PORT = process.env.PORT || 5005;

// Define middleware here

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: 'war time',
		resave: true,
		saveUninitialized: true,
		// cookie: { secure: true }
	})
);
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
// Add routes, both API and view
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/events/admin', require('./routes/eventAdmin'));
app.use('/api/events/pair', require('./routes/eventPairing'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/languages', require('./routes/languages'));

// Connect to the Mongo DB
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/war-time', {
	useNewUrlParser: true,
	useFindAndModify: false,
});

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
