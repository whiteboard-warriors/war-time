const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   GET /api/events
// @desc    Retrieves all events
router.get('/', isAuthenticated, async (req, res) => {
	try {
		const event = await db.Event.find()
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET /api/events
// @desc    Retrieves one event
router.get('/:id', isAuthenticated, async (req, res) => {
	try {
		const event = await db.Event.find({
			_id: req.params.id,
		})
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
