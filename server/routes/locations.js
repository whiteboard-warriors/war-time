const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// // @route   GET /
// // @desc    Retrieves all locations.

// router.get('/', async (req, res) => {
// 	try {
// 		const location = await db.Location.find();
// 		res.json(location);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// // @route   POST /add
// // @desc    Admin creates an location

// router.post('/add', async (req, res) => {
// 	const {
// 		// TODO
// 	} = req.body;
// 	try {
// 		const location = new db.Location({
// 			// TODO
// 		});
// 		await location.save();
// 		res.send('Your location was added!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// // @route   UPDATE update/:id - [works 2/12]
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

// // @route   DELETE delete/:id - [works 2/12]
// // @desc    Deletes location by ID.

// router.delete('/delete/:id', async (req, res) => {
// 	const { _id } = req.body;
// 	try {
// 		await db.Location.findOneAndDelete({
// 			_id,
// 		});
// 		res.send('Your location was deleted!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;
