const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

const { check, validationResult } = require('express-validator');

// const isAuthenticated = require('../config/middleware/isAuthenticated');

const db = require('../models');

// @route   POST api/users
// @desc - Sign up
router.post(
	'/signup',
	[
		check('firstName', 'Please add your first name.').not().isEmpty(),
		check('lastName', 'Please add your last name.').not().isEmpty(),

		check('email', 'Please include a valid email').isEmail(),
		check('admin', 'Please confirm you are an Admin.').isBoolean(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstName,
			lastName,
			email,
			password,
			slackUsername,
			linkedIn,
			primaryLanguage,
			secondaryLanguage,
			admin,
		} = req.body;

		if (!admin) admin = false;
		if (!slackUsername) slackUsername = '';
		if (!linkedIn) linkedIn = '';
		if (!admin) admin = false;

		try {
			let user = await db.User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}
			user = new db.User({
				firstName,
				lastName,
				email,
				password,
				slackUsername,
				linkedIn,
				primaryLanguage,
				secondaryLanguage,
				admin,
			});

			await user.save();
			res.status(200).end('User Saved');
			res.redirect(307, 'api/auth/login'); // api login
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT api/users
// @desc - Delete User
// router.put('/admin/:userId', async (req, res) => {
// 	try {
// 		const isFriend = await db.User.findOne({ _id: req.user._id });
// 		// res.send(isFriend.friends)
// 		for (let i = 0; i < isFriend.friends.length; i++) {
// 			if (
// 				isFriend.friends[i].user == req.params.friendId &&
// 				isFriend.friends[i].status === 0
// 			) {
// 				return res.status(500).send('You are already not friends');
// 			}
// 		}
// 		await db.User.findByIdAndUpdate(
// 			{ _id: req.user._id },
// 			{
// 				$set: {
// 					'friends.$[item].status': 0, // unfriend.
// 				},
// 			},
// 			{
// 				arrayFilters: [{ 'item.user': req.params.friendId }],
// 				new: true,
// 			}
// 		);
// 		await db.User.findByIdAndUpdate(
// 			{ _id: req.params.friendId },
// 			{
// 				$set: {
// 					'friends.$[item2].status': 0, // unfriends
// 				},
// 			},
// 			{
// 				arrayFilters: [{ 'item2.user': req.user._id }],
// 				new: true,
// 			}
// 		);
// 		res.status(200).send('You are no longer friends.');
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

module.exports = router;
