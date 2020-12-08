const express = require('express');
const router = express.Router();

const db = require('../models');

// @route   GET /api/events
// @desc    Retrieves all events
router.get('/', async (req, res) => {
	try {
		const event = await db.Event.find()
			.populate('location')
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
// @desc    Retrieves One events
router.get('/:id', async (req, res) => {
	try {
		const event = await db.Event.findOne({
			_id: req.params.id,
		})
			.populate('location')
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
router.get('/:slug', async (req, res) => {
	try {
		const event = await db.Event.findOne({
			slug: req.params.slug,
		});
		return res.json(event);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * TODO
 * Ensure Events are Created in the Future -
 * Ensure Events are unique
 * Auto-generate "Number" Whiteboard Warriors #XX for Meetup Events
 */
router.post('/', async (req, res) => {
	const { title, dateTime, onlinePlatform } = req.body;
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user.id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to create events.',
			});
		}

		let slug = createSlug(title);

		const event = new db.Event({
			createdBy: req.user._id,
			title,
			slug,
			dateTime,
			onlinePlatform,
		});
		await event.save();
		res.send('Your event was created was created!');
	} catch (err) {
		console.error(err.message);
		res.status(500).json({
			msg: err.message,
		});
	}
});

// @route   PUT /api/events
// @desc    Allows Admin to update event
router.put('/:id', async (req, res) => {
	console.log('update ran - line 97');
	const { title, dateTime, onlinePlatform } = req.body;
	console.log(title, dateTime, onlinePlatform);
	try {
		const event = {};
		if (title) event.title = title;
		if (dateTime) event.dateTime = dateTime;
		if (onlinePlatform) event.onlinePlatform = onlinePlatform;

		// // check to make sure user making updates has admin rights.
		// let user = await db.User.findOne({ _id: req.user._id });
		// if (user.admin !== true) {
		// 	return res.status(401).json({
		// 		msg: 'You are not authorized to edit this event.',
		// 	});
		// }

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

/**
 * https://stackoverflow.com/a/5782563/216194
 * @param {*} str
 */
let createSlug = function (str) {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	let from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
	let to = 'aaaaaeeeeeiiiiooooouuuunc------';
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
};

module.exports = router;
