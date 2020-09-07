const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');

// @route   POST api/auth
// @desc - Login
router.post('/login', async function (req, res) {
	const { email, password } = req.body;
	let user = await db.User.findOne({ email: email });

	if (!user) {
		return res.status(404).json({ emailnotfound: 'Email not found' });
	}

	// Check password
	bcrypt.compare(password, user.password).then((isMatch) => {
		if (isMatch) {
			// User matched
			// Create JWT Payload
			const payload = {
				id: user.id,
				name: user.name,
			};
			// Sign token
			jwt.sign(
				payload,
				'secret',
				{
					expiresIn: 31556926, // 1 year in seconds
				},
				(err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				}
			);
		} else {
			return res.status(400).json({
				msg: 'Invalid Credentials',
			});
		}
	});
});

// @route   POST api/auth
// @desc - Logout
router.post('/logout', function (req, res) {
	req.logout();
	res.json({}).redirect('/login');
});

module.exports = router;
