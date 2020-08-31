const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema

const AttendanceSchema = new Schema({
	createdAt: {
		type: Date,
	},
	lastUpdated: {
		type: Date,
	},
	socket: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

AttendanceSchema.pre('save', function (next) {
	this.lastUpdated = new Date()
	next()
})

const Attendance = mongoose.model('Attendance', AttendanceSchema)

module.exports = Attendance
