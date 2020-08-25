const express = require('express')
const router = express.Router()
// const passport = require('../config/passport');

const db = require('../models')
const isAuthenticated = require('../config/middleware/isAuthenticated')

// @route   GET /api/events
// @desc    Retrieves all events
router.get('/', isAuthenticated, async (req, res) => {
	try {
		const event = await db.Event.find()
			.populate('location')
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4')
		res.json(event)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   GET /api/events
// @desc    Retrieves one event
router.get('/:id', isAuthenticated, async (req, res) => {
	try {
		const event = await db.Event.find({
			_id: req.params.id,
		})
			.populate('location')
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4')
		res.json(event)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

/**
 * TODO
 * Ensure Events are Created in the Future -
 * Ensure Events are unique
 * Auto-generate "Number" Whiteboard Warriors #XX for Meetup Events
 */
router.post('/', isAuthenticated, async (req, res) => {
	const { title, dateTime } = req.body
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id })
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to create events.',
			})
		}
		const event = new db.Event({
			createdBy: req.user._id,
			title,
			dateTime,
		})
		await event.save()
		res.send('Your event was created was created!')
	} catch (err) {
		console.error(err.message)
		res.status(500).json({
			msg: err.message,
		})
	}
})

module.exports = router
