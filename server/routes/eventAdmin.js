const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   POST /api/events/admin
// @desc    Admin creates an event
router.post('/', async (req, res) => {
	let {
		location,
		date,
		startTime,
		endTime,
		languages,
		levels,
		attendees,
		matches,
	} = req.body;

	if (!attendees) attendees = [];
	if (!matches) matches = [];

	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
			});
		}

		const event = new db.Event({
			createdBy: req.user._id,
			location,
			date: new Date(date),
			startTime: new Date(startTime),
			endTime: new Date(endTime),
			languages,
			levels,
			attendees,
			matches,
		});
		await event.save();
		res.send('Your event was created!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   PUT /api/events/admin
// @desc    Allows Admin to update event
router.put('/:id', async (req, res) => {
	const { location, date, startTime, endTime, languages, levels } = req.body;
	try {
		const event = {};
		if (location) event.location = location;
		if (date) event.date = date;
		if (startTime) event.startTime = startTime;
		if (endTime) event.endTime = endTime;
		if (languages) event.languages = languages;
		if (levels) event.levels = levels;

		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
			});
		}

		await db.Event.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: event }
		);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /api/events/admin
// @desc    Delete event if user is admin.
router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user.id });
		console.log(user);
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to delete events.',
			});
		}
		await db.Event.findOneAndDelete({
			_id: req.params.id,
		});
		res.send('Your event was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// Currently Unnecessary
// @route   PUT /api/events
// @desc    Adds attendees to event once they sign in.
// router.put('/attendees/:userId/:eventId', async (req, res) => {
// 	const { level } = req.body;
// 	try {
// 		// // check to make sure user making updates has admin rights.
// 		// let user = await db.User.findOne({ _id: req.user._id });
// 		// if (user.admin !== true) {
// 		// 	return res.status(401).json({
// 		// 		msg: 'You are not authorized to edit this event.',
// 		// 	});
// 		// }

// 		const attendee = await db.User.findOne({ _id: req.params.userId });
// 		await db.Event.findOneAndUpdate(
// 			{ _id: req.params.eventId },
// 			{
// 				$push: {
// 					attendees: { attendee, level },
// 				},
// 			}
// 		);
// 		res.send('Your event was updated!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;
