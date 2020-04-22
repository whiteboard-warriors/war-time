const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// @route   POST /create
// @desc    Admin creates an event

router.post('/', async (req, res) => {
	let {
		location,
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
		let user = await db.User.findOne({ _id: req.user._id });

		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit foods in this event.',
			});
		}

		const event = new db.Event({
			createdBy: req.user._id,
			location,
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

// @route   GET /
// @desc    Retrieves all events

router.get('/', async (req, res) => {
	try {
		const event = await db.Event.find();
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET /
// @desc    Retrieves one event

router.get('/:id', async (req, res) => {
	try {
		const event = await db.Event.find({
			_id: req.params.id,
		});
		res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   UPDATE /:id
// @desc    Allows Admin to update event

router.put('/:id', async (req, res) => {
	const { location, startTime, endTime, languages, levels } = req.body;
	try {
		const event = {};
		if (location) event.location = location;
		if (startTime) event.startTime = startTime;
		if (endTime) event.endTime = endTime;
		if (languages) event.languages = languages;
		if (levels) event.levels = levels;

		let user = await db.User.findOne({ _id: req.user._id });

		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit foods in this event.',
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
// @route   UPDATE /attendees/:id
// @desc    Allows Admin to update event
router.put('/attendees/:id', async (req, res) => {
	const { attendees } = req.body;
	try {
		let user = await db.User.findOne({ _id: req.user._id });

		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit foods in this event.',
			});
		}

		await db.Event.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: attendees }
		);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
// @route   UPDATE /matches/:id
// @desc    Allows Admin to update event

// @route   DELETE delete/:id - [works 2/12]
// @desc    Route to delete whole event if createdby user = req.user._id

router.delete('/:id', async (req, res) => {
	try {
		await db.Event.findOneAndDelete({
			_id: req.params.id,
		});
		res.send('Your event was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
