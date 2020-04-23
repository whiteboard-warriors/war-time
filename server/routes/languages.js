const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// @route   POST /add language
// @desc    Admin creates an event

router.post('/', async (req, res) => {
	const { createdBy, language } = req.body;
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		const item = new db.Language({
			createdBy,
			language,
		});
		await item.save();
		res.send('A new language was added!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST /add language
// @desc    Admin creates an event

router.post('/add', async (req, res) => {
	const {
		// TODO
	} = req.body;
	try {
		const language = new db.Language({
			// TODO
		});
		await language.save();
		res.send('Your language was added!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /:id - [works 2/12]
// @desc    Delete language

router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to perform this action.',
			});
		}
		await db.Language.findOneAndDelete({ _id: req.params.id });
		res.send('Your language was deleted!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
