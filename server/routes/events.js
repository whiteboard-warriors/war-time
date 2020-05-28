const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   POST /api/events
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
		let user = await db.User.findOne({ _id: req.user._id });
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

// @route   GET /api/events
// @desc    Retrieves all events
router.get('/', async (req, res) => {
	try {
		const event = await db.Event.find()
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
router.get('/:id', async (req, res) => {
	try {
		const event = await db.Event.find({
			_id: req.params.id,
		})
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

// @route   PUT /api/events
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

// @TODO
// 			-	add functionality to add unmatched users to existing matches.
//			- 	implement google doc api to auto generate google docs

// @route   PUT /api/events
// @desc    Pair users that haven't been matched with a perfect match and add them to a group that best matches.

router.put('/pair/:eventId', async (req, res) => {
	try {
		// stores matches array from current event into variable 'matches'
		const event = await db.Event.findOne({ _id: req.params.eventId })
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		async function autoPair(attendeesArr, counter) {
			// stores array passed through arguments to new array & renamed
			// back to attendeesArr
			let newArr = [];
			newArr = attendeesArr;
			let arrayCounter = counter;
			let currIndex = 0;
			let level = 0;
			let primaryLang = '';
			let secondaryLang = '';
			// loops through 'matches', finds first index where isMatches=false
			// & stores level & 1st lang into function variables as well as
			// current index #
			for (let i = 0; i < newArr.length; i++) {
				if (newArr[i].isMatched === false) {
					currIndex = i;
					level = newArr[i].level;
					primaryLang = newArr[i].attendee.primaryLanguage;
					secondaryLang = newArr[i].attendee.secondaryLanguage;

					break;
				}
			}

			// loops through
			for (let j = currIndex + 1; j < newArr.length; j++) {
				let isMatch;
				// Same Language and nearest level up.
				if (
					newArr[j].isMatched === false &&
					level === newArr[j].level + 1 &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level up found');
					isMatch = true;
					// Same Language and nearest level down.
				} else if (
					newArr[j].isMatched === false &&
					level === newArr[j].level - 1 &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level down found');
					isMatch = true;
				}
				// Secondary language and exact level.
				else if (
					newArr[j].isMatched === false &&
					level === newArr[j].level &&
					secondaryLang === newArr[j].attendee.secondaryLanguage
				) {
					console.log('secondary language and exact level found');
					isMatch = true;
				}
				// Secondary language and nearest level up.
				else if (
					newArr[j].isMatched === false &&
					level === newArr[j].level + 1 &&
					secondaryLang === newArr[j].attendee.secondaryLanguage
				) {
					console.log(
						'secondary language and nearest level up found'
					);
					isMatch = true;
					// Secondary language and nearest level down.
				} else if (
					newArr[j].isMatched === false &&
					level === newArr[j].level - 1 &&
					secondaryLang === newArr[j].attendee.secondaryLanguage
				) {
					console.log(
						'secondary language and nearest level down found'
					);
					isMatch = true;
					// f. Primary language and any level.
				} else if (
					newArr[j].isMatched === false &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					console.log('primary language and any level found');
					isMatch = true;
				} else {
					console.log('no matches found');
					isMatch = false;
				}

				if (isMatch) {
					// Use the lowest level between the two matches.
					let finalLevel;
					if (newArr[currIndex].level <= newArr[j].level) {
						finalLevel = newArr[currIndex].level;
					} else {
						finalLevel = newArr[j].level;
					}

					// builds match object
					let newMatch = {
						user1: newArr[currIndex].attendee._id,
						user2: newArr[j].attendee._id,
						docLink:
							'https://docs.google.com/document/d/1bPKYC_rSkfqZdk3vj6Esj_Amp72RVfJ87zhTkWOfPfw/edit', // temp doc link - google doc api data to replace this
						level: finalLevel,
					};

					// updates matched users isMatched to true
					await db.Event.findByIdAndUpdate(
						{ _id: req.params.eventId },
						{
							$set: {
								'attendees.$[item].isMatched': true,
							},
						},
						{
							arrayFilters: [
								{
									'item.attendee':
										newArr[currIndex].attendee._id,
								},
							],
							new: true,
						}
					);
					await db.Event.findByIdAndUpdate(
						{ _id: req.params.eventId },
						{
							$set: {
								'attendees.$[item].isMatched': true,
							},
						},
						{
							arrayFilters: [
								{
									'item.attendee': newArr[j].attendee._id,
								},
							],
							new: true,
						}
					);

					// console.log('************  newMatch  ***************');
					// console.log(newMatch);
					// add new match to matches field
					await db.Event.findByIdAndUpdate(
						{ _id: req.params.eventId },
						{
							$push: {
								matches: newMatch,
							},
						}
					);
					break;
				}
			}
			const updatedEvent = await db.Event.findOne({
				_id: req.params.eventId,
			})
				.populate('attendees.attendee')
				.populate('matches.user1')
				.populate('matches.user2')
				.populate('matches.user3')
				.populate('matches.user4');

			newArr = updatedEvent.attendees;

			if (arrayCounter <= newArr.length) {
				arrayCounter = arrayCounter + 1;
				console.log('autoPair should run again');
				autoPair(newArr, arrayCounter);
			} else {
				res.send('Users have been paired!');
				console.log('recursion stopped');
				return;
			}
		}

		autoPair(event.attendees, 1);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @TODO
// @route   PUT /api/events
// @desc    Updates match pair by adding additional people to group.
router.put('/matches/update/:eventId/userId', async (req, res) => {
	// find event by id
	// loop through event.matches
	// const { _id, level, primaryLanguage, secondaryLanguage } = req.body;
	try {
		await db.Event.findOneAndUpdate(
			{ _id: req.params.eventId }
			// { TODO
			// 	$push: {
			// 		'matches.$[item].user3': req.params
			// 	},
			// }
		);
		res.send('Your event was updated!');
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   DELETE /api/events
// @desc    Delete event if user is admin.
router.delete('/:id', async (req, res) => {
	try {
		// check to make sure user making updates has admin rights.
		let user = await db.User.findOne({ _id: req.user._id });
		if (user.admin !== true) {
			return res.status(401).json({
				msg: 'You are not authorized to edit this event.',
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

module.exports = router;
