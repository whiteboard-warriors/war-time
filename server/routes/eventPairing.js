const express = require('express');
const router = express.Router();
// const passport = require('../config/passport');

const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');

// @route   PUT /api/events/pairing
// @desc    Adds attendees to event once they sign in and looks for match with the same level and same language. If found, new user and match are added to the matches field.
// isAuthenticated
router.put('/attendee/:eventId', isAuthenticated, async (req, res) => {
	const { level, _id } = req.body;
	const docLink = 'tempLink.toBeGeneratedByDocApiCall';
	let matched;

	try {
		// fetch current list of attendees
		const event = await db.Event.findOne({ _id: req.params.eventId })
			.populate('attendees.attendee')
			.populate('matches.user1')
			.populate('matches.user2')
			.populate('matches.user3')
			.populate('matches.user4');
		// console.log('event......=', event);
		const currentAttendees = event.attendees;
		// check if new attendee has already been added.
		for (let n = 0; n < currentAttendees.length; n++) {
			if (currentAttendees[n].attendee._id == _id) {
				return res.status(401).json({
					msg: 'This attendee has already been added.',
				});
			}
		}
		// console.log(currentAttendees.length);
		// find user in db by _id
		const newAttendee = await db.User.findOne({ _id });
		for (let i = 0; i < currentAttendees.length; i++) {
			// check if attendees match isMatch is false, if primaryLanguage matches and if levels match.
			if (
				currentAttendees[i].isMatched === false &&
				currentAttendees[i].attendee.primaryLanguage ===
					newAttendee.primaryLanguage &&
				currentAttendees[i].level === level
			) {
				console.log(
					currentAttendees[i].isMatched === false &&
						currentAttendees[i].attendee.primaryLanguage ===
							newAttendee.primaryLanguage &&
						currentAttendees[i].level === level
				);

				console.log('new attendee just added  ====', _id);
				console.log(
					'attendee match found ====',
					currentAttendees[i].attendee._id
				);
				// store users to matches field on db.event
				const newMatch = {
					user1: newAttendee._id,
					user2: currentAttendees[i].attendee._id,
					docLink,
					level,
				};
				console.log(newMatch);
				await db.Event.findOneAndUpdate(
					{ _id: req.params.eventId },
					{
						$push: {
							matches: newMatch,
						},
					}
				);
				// add newAttendee to list of attendees
				await db.Event.findOneAndUpdate(
					{ _id: req.params.eventId },
					{
						$push: {
							attendees: { attendee: newAttendee._id, level },
						},
					}
				);
				// set matched users' isMatched to true
				await db.Event.findByIdAndUpdate(
					{ _id: req.params.eventId },
					{
						$set: {
							'attendees.$[item].isMatched': true,
						},
					},
					{
						arrayFilters: [{ 'item.attendee': newAttendee._id }], // user that was just added.
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
								'item.attendee':
									currentAttendees[i].attendee._id, // user which was perfectly matched to user just added.
							},
						], // user that was just added.
						new: true,
					}
				);
				matched = true;
				// break out of the loop once match is found
				break;
				//if no match found, store new attendee to attendees field
			} else {
				await db.Event.findOneAndUpdate(
					{ _id: req.params.eventId },
					{
						$push: {
							attendees: { attendee: newAttendee._id, level },
						},
					}
				);
				matched = false;
			}
		}
		if (matched) {
			res.send('Attendee added and matched!');
		} else {
			res.send('Attendee added but not matched!');
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @TODO
// 			-	add functionality to add unmatched users to existing matches.
//			- 	implement google doc api to auto generate google docs
// @route   PUT /api/events/pairing

// @desc    Pair users that haven't been matched with a perfect match and add them to a group that best matches.

router.put('/trigger/:eventId', async (req, res) => {
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
					level === newArr[j].level - 1 &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level down found');
					isMatch = true;
					// Same Language and nearest level down.
				} else if (
					newArr[j].isMatched === false &&
					level === newArr[j].level + 1 &&
					primaryLang === newArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level up found');
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

router.put('/test/:eventId', async (req, res) => {
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
			let currAttendeesArr = [];
			currAttendeesArr = attendeesArr;
			let arrayCounter = counter;
			let currIndex = 0;
			let level = 0;
			let primaryLang = '';
			let secondaryLang = '';
			// loops through 'matches', finds first index where isMatches=false
			// & stores level & 1st lang into function variables as well as
			// current index #
			for (let i = 0; i < currAttendeesArr.length; i++) {
				if (currAttendeesArr[i].isMatched === false) {
					currIndex = i;
					level = currAttendeesArr[i].level;
					primaryLang = currAttendeesArr[i].attendee.primaryLanguage;
					secondaryLang =
						currAttendeesArr[i].attendee.secondaryLanguage;

					break;
				}
			}

			// loops through rest of attendees and finds a match
			for (let j = currIndex + 1; j < currAttendeesArr.length; j++) {
				let isMatch;
				// Same Language and nearest level up.
				if (
					currAttendeesArr[j].isMatched === false &&
					level === currAttendeesArr[j].level - 1 &&
					primaryLang === currAttendeesArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level down found');
					isMatch = true;
					// Same Language and nearest level down.
				} else if (
					currAttendeesArr[j].isMatched === false &&
					level === currAttendeesArr[j].level + 1 &&
					primaryLang === currAttendeesArr[j].attendee.primaryLanguage
				) {
					console.log('same language and nearest level up found');
					isMatch = true;
				}
				// Secondary language and exact level.
				else if (
					currAttendeesArr[j].isMatched === false &&
					level === currAttendeesArr[j].level &&
					secondaryLang ===
						currAttendeesArr[j].attendee.secondaryLanguage
				) {
					console.log('secondary language and exact level found');
					isMatch = true;
				}
				// Secondary language and nearest level up.
				else if (
					currAttendeesArr[j].isMatched === false &&
					level === currAttendeesArr[j].level + 1 &&
					secondaryLang ===
						currAttendeesArr[j].attendee.secondaryLanguage
				) {
					console.log(
						'secondary language and nearest level up found'
					);
					isMatch = true;
					// Secondary language and nearest level down.
				} else if (
					currAttendeesArr[j].isMatched === false &&
					level === currAttendeesArr[j].level - 1 &&
					secondaryLang ===
						currAttendeesArr[j].attendee.secondaryLanguage
				) {
					console.log(
						'secondary language and nearest level down found'
					);
					isMatch = true;
					// f. Primary language and any level.
				} else if (
					currAttendeesArr[j].isMatched === false &&
					primaryLang === currAttendeesArr[j].attendee.primaryLanguage
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
					if (
						currAttendeesArr[currIndex].level <=
						currAttendeesArr[j].level
					) {
						finalLevel = currAttendeesArr[currIndex].level;
					} else {
						finalLevel = currAttendeesArr[j].level;
					}

					// builds match object
					let newMatch = {
						user1: currAttendeesArr[currIndex].attendee._id,
						user2: currAttendeesArr[j].attendee._id,
						docLink:
							'https://docs.google.com/document/d/1bPKYC_rSkfqZdk3vj6Esj_Amp72RVfJ87zhTkWOfPfw/edit', // temp doc link - google doc api data to replace this
						level: finalLevel,
					};

					// updates matched users isMatched to true on db
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
										currAttendeesArr[currIndex].attendee
											._id,
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
									'item.attendee':
										currAttendeesArr[j].attendee._id,
								},
							],
							new: true,
						}
					);

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
			// retrieves updated list of attendees from db
			const updatedEvent = await db.Event.findOne({
				_id: req.params.eventId,
			})
				.populate('attendees.attendee')
				.populate('matches.user1')
				.populate('matches.user2')
				.populate('matches.user3')
				.populate('matches.user4');

			currAttendeesArr = updatedEvent.attendees;

			if (arrayCounter <= currAttendeesArr.length) {
				arrayCounter = arrayCounter + 1;
				console.log('autoPair should run again');
				autoPair(currAttendeesArr, arrayCounter);
			} else {
				res.send('Users have been paired!');
				console.log('recursion stopped');
				addToMatch(currAttendeesArr, updatedEvent.matches, 1);
			}
		}

		async function addToMatch(attendeesArr, matchArr, counter) {
			let currAttendeesArr = [];
			let currMatchesArr = [];
			currAttendeesArr = attendeesArr;
			currMatchesArr = matchArr;
			let arrayCounter = counter;
			let currIndex = 0;
			let level = 0;
			let primaryLang = '';
			let secondaryLang = '';
			let userId = '';

			// loop through attendees and check if isMatch === false
			for (let i = 0; i < currAttendeesArr.length; i++) {
				if (currAttendeesArr[i].isMatched === false) {
					// store user pertinent info and break out of the look
					currIndex = i;
					level = currAttendeesArr[i].level;
					primaryLang = currAttendeesArr[i].attendee.primaryLanguage;
					secondaryLang =
						currAttendeesArr[i].attendee.secondaryLanguage;
					userId = currAttendeesArr[i].attendee._id;

					break;
				}
			}

			// loop through list of matches
			for (let j = 0; j < currMatchesArr.length; j++) {
				let isMatch;
				// Same Language and nearest level up.
				if (
					// check if !user3 or !user4
					!currMatchesArr[j].user3 ||
					!currMatchesArr[j].user4
				) {
					if (
						// same primary language and same level
						currMatchesArr[j].user2.primaryLanguage ===
							primaryLang &&
						currMatchesArr[j].level === level
					) {
						console.log(
							'matched with same level and primary language'
						);
						isMatch = true;
					} else if (
						// else if same primary language and next level down
						currMatchesArr[j].user2.primaryLanguage ===
							primaryLang &&
						currMatchesArr[j].level === level - 1
					) {
						console.log(
							'matched with same primary language and next level down'
						);
						isMatch = true;
					} else if (
						// else if same primary language and next level up
						currMatchesArr[j].user2.primaryLanguage ===
							primaryLang &&
						currMatchesArr[j].level === level + 1
					) {
						console.log(
							'matched with same primary language and next level up'
						);
						isMatch = true;
					} else if (
						// else if same secondary language and same level
						currMatchesArr[j].user2.secondaryLanguage ===
							secondaryLang &&
						currMatchesArr[j].level === level
					) {
						console.log(
							'matched with same secondary language and same level'
						);
						isMatch = true;
					} else if (
						// else if same secondary language and next level down
						currMatchesArr[j].user2.secondaryLanguage ===
							secondaryLang &&
						currMatchesArr[j].level === level - 1
					) {
						console.log(
							'matched with same secondary language and next level down'
						);
						isMatch = true;
					} else if (
						// else if same secondary language and next level up
						currMatchesArr[j].user2.secondaryLanguage ===
							secondaryLang &&
						currMatchesArr[j].level === level + 1
					) {
						console.log(
							'matched with same secondary language and next level up'
						);
						isMatch = true;
					} else if (
						// else if same primary language.
						currMatchesArr[j].user2.primaryLanguage === primaryLang
					) {
						console.log('matched with same primary language');
						isMatch = true;
					}
				}
				// check if user should be added to user3 or user4
				if (isMatch) {
					let user;
					if (currMatchesArr[j].user3) {
						user = 'matches.$[item].user4';
					} else {
						user = 'matches.$[item].user3';
					}
					// add new user to match
					await db.Event.findByIdAndUpdate(
						{ _id: req.params.eventId },
						{
							$push: {
								user: userId, // defined at the top of the func.
							},
						},
						{
							arrayFilters: [
								{
									'item.matches': currMatchesArr[j]._id,
								},
							],
							new: true,
						}
					);

					/* TO DO  
                    - update user that was added to match isMatch = true
                        */
					// add new match to matches field
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
										currAttendeesArr[currIndex].attendee
											._id,
								},
							],
							new: true,
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

			currAttendeesArr = updatedEvent.attendees;
			currMatchesArr = updatedEvent.attendees;

			if (arrayCounter <= currAttendeesArr.length) {
				arrayCounter = arrayCounter + 1;
				console.log('autoPair should run again');
				addToMatch(currAttendeesArr, currMatchesArr, arrayCounter);
			} else {
				res.send('Users have been added to match groups!');
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
module.exports = router;
