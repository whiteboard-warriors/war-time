const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// // @route   POST /add language
// // @desc    Admin creates an event

// router.post('/add', async (req, res) => {
// 	const {
// 		// TODO
// 	} = req.body;
// 	try {
// 		const language = new db.Language({
// 			// TODO
// 		});
// 		await language.save();
// 		res.send('Your language was added!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// @route   DELETE delete/:id - [works 2/12]
// @desc    Delete language

// router.delete('/delete/:id', async (req, res) => {
// 	try {
//         await db.Language.findOneAndDelete({
//             //TODO
//         })
//         res.send('Your language was deleted!');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;
