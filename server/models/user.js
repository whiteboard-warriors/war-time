const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
		unique: true,
		required: 'Email is Required',
	},
	password: {
		type: String,
		validate: [
			({ length }) => length >= 6,
			'Password needs to be longer than 6 characters.',
		],
		required: 'Password is Required',
	},
	firstName: {
		type: String,
		required: 'First name is Required',
	},
	lastName: {
		type: String,
		required: 'Last name is Required',
	},
	slackUsername: {
		type: String,
	},
	linkedIn: {
		type: String,
	},
	admin: {
		type: Boolean,
		required: 'You must confirm you are an Admin',
	},
	events: [
		{
			event: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Event',
			},
			location: {
				type: String,
			},
		},
	],
});

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(
		this.password,
		bcrypt.genSaltSync(10),
		null
	);
	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
