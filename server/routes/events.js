const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// // @route   GET /
// // @desc    Retrieves all events older than now.

// router.get('/', async (req, res) => {
// 	try {
// 		const event = await db.Event.find({
// 			date: { $gte: new Date() },
// 		});
// 		res.json(event);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// // @route   POST /create
// // @desc    Admin creates an event

// router.post('/create', async (req, res) => {
// 	const {
// 		// TODO
// 	} = req.body;
// 	try {
// 		const event = new db.Event({
// 			// TODO
// 		});
// 		await event.save();
// 		res.send('Your event was created!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// // @route   UPDATE update/:id - [works 2/12]
// // @desc    Allows Admin to update event

// router.put('/update/:id', async (req, res) => {
// 	const {
// 		// TODO
// 	} = req.body;
// 	try {
// 		const event = db.Event.findOne({
// 			// TODO
// 		});
// 		await event.save();
// 		res.send('Your event was updated!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// // @route   DELETE delete/:id - [works 2/12]
// // @desc    Route to delete whole event if createdby user = req.user._id

// router.delete('/delete/:id', async (req, res) => {
// 	try {
// 		await db.Event.findOneAndDelete({
// 			//TODO
// 		});
// 		res.send('Your event was deleted!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;