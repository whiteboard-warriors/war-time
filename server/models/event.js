const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema

const EventSchema = new Schema({
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
		unique: true,
		dropDups: true,
	},
	slug: {
		type: String,
		required: false,
	},
	dateTime: {
		type: Date,
		required: true,
	},
	// location: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Location',
	// },
	// date: {
	// 	type: Date,
	// 	required: true,
	// },
	// startTime: {
	// 	type: Date,
	// 	required: true,
	// },
	// endTime: {
	// 	type: Date,
	// 	required: true,
	// },
	// languages: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Language',
	// },

	// levels: [
	// 	{
	// 		type: String,
	// 	},
	// ],
	// attendees: [
	// 	{
	// 		attendee: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'User',
	// 		},
	// 		isMatched: {
	// 			type: Boolean,
	// 			default: false,
	// 		},
	// 		level: {
	// 			type: Number,
	// 			required: 'You must enter problem level',
	// 		},
	// 	},
	// ],
	// matches: [
	// 	{
	// 		user1: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'User',
	// 		},
	// 		user2: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'User',
	// 		},
	// 		user3: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'User',
	// 		},
	// 		user4: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'User',
	// 		},
	// 		docLink: {
	// 			type: String,
	// 		},
	// 		language: {
	// 			type: String,
	// 		},
	// 		level: {
	// 			type: Number,
	// 			required: 'You must enter problem level',
	// 		},
	// 	},
	// ],
})

const Event = mongoose.model('Event', EventSchema)

module.exports = Event
