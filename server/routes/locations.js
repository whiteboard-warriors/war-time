const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// @route   GET /
// @desc    Retrieves all locations.

router.get('/', async (req, res) => {
	// check to make sure user making updates has admin rights.
	let user = await db.User.findOne({ _id: req.user._id });
	if (user.admin !== true) {
		return res.status(401).json({
			msg: 'You are not authorized to make changes.',
		});
	}
	try {
		const locations = await db.Location.find();
		res.json(locations);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST /
// @desc    Admin creates an location

router.post('/', async (req, res) => {
	const {
		createdBy,
		name,
		street,
		unit,
		city,
		state,
		zipCode,
		onlinePlatform,
	} = req.body;
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to make changes.',
			});
		}
		const location = new db.Location({
			createdBy,
			name,
			street,
			unit,
			city,
			state,
			zipCode,
			onlinePlatform,
		});
		await location.save();
		res.send('Your location was added!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// // @route   UPDATE update/:id -
// // @desc    Allows Admin to update location

// router.put('/update/:id', async (req, res) => {
// 	const {
// 		// TODO
// 	} = req.body;
// 	try {
// 		const location = db.Location.findOne({
// 			// TODO
// 		});
// 		await location.save();
// 		res.send('Your location was updated!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// @route   DELETE /:id -
// @desc    Deletes location by ID.

router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to make changes.',
			});
		}
		await db.Location.findOneAndDelete({
			_id: req.params.id,
		});
		res.send('The location was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
