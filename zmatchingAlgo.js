// Matching parameters

// automatic  - loops through unmatched users and match them

// 1. Level and primary language

//manual  -  loops through array of matches, checks the level and primary language of user1 and - if any of the parameters below are true, add the user to the current array of matches.

// 1. Language and nearest level.

// 2. Secondary language and exact level

// 3. Secondary language and nearest level.

// 3. Primary language and any level.

// ALGO //

// 1) GO THROUGH EACH INDEX, IF isMatched === false =>

// 2) store first available index's level, primary language & secondary language and userId

// AUTOMATIC LEVEL & PRIMARY LANGUAGE MATCH ATTEMPT//
// 3) run through each other index, IF isMatched === false =>,  see if level && primary language is exact match  --------------> if match, change both index's 'isMatched' to true & store _ids in matches array of user objects

// loop array of unmatched,  keep track of first unmatched person
// loop through the rest using case 1,
// if there is a match, you store both in array array of matches,
// changed users to ismatched = true
// restart the loop to find the next unmatched user.
// repeat.

// MANUAL LANGUAGE & NEAREST LEVEL//

// 4) run through each other index where isMatched === false.  If primary language is a match, then compare levels.  if index's level is +/- 1 from stored level, if match, change both index's 'isMatched' to true & store _ids in matches array of user objects.

// MANUAL 2ND LANGUAGE & EXACT LEVEL//
// 5) run through each other index where isMatched === false.  If level is a match & 2nd language is match if match, change both index's 'isMatched' to true & store _ids in matches array of user objects.

// MANUAL 2ND LANGUAGE & NEAREST LEVEL//
// 6) run through each other index where isMatched === false.  If 2nd language is a match, then compare levels.  if index's level is +/- 1 from stored level, if match, change both index's 'isMatched' to true & store _ids in matches array of user objects.

// MANUAL PRIMARY LANGUAGE //
// 7) run through each other index where isMatched === false.  If primary language is match, if match, change both index's 'isMatched' to true & store _ids in matches array of user objects.

// loop to find unmatched user and keep track of the first user,
// loop through unmatched users and run checks 1 through 4 above.
// if there is a match, store to array of matches and set ismatched to true.

// if there is are any remainders,
// loop through remainders,
// keep track of first unmatched user
// loop through array of matches in the db
// run through match case 1 through 4
// if there is a match, store unmatched user to the matches array, to the  matched object .

var attendees = [
	{
		isMatched: false,
		level: 2,
		_id: '5ea0eb90ba9a9d80054b471a',
		attendee: {
			_id: '1',
			firstName: 'Pablo',
			lastName: 'Motta',
			email: 'pmotta@gmail.com',
			password:
				'$2a$10$VtRNyK9R0bect7eS3kY8oePu583ORRVEIvPXrQaKwO93ZyefhX9Qm',
			slackUsername: '@Pablo Motta',
			linkedIn: 'linkedin.com/in/pablomotta',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'Python',
			admin: true,
			__v: 0,
		},
	},
	{
		isMatched: false,
		level: 2,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '2',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'Python',
			admin: false,
			__v: 0,
		},
	}, //perfect match
	{
		isMatched: false,
		level: 3,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '3',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Python',
			secondaryLanguage: 'Java',
			admin: false,
			__v: 0,
		},
	},
	{
		isMatched: false,
		level: 3,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '4',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'Java',
			admin: false,
			__v: 0,
		},
	}, // match level and secondary language
	{
		isMatched: false,
		level: 1,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '5',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'Python',
			admin: false,
			__v: 0,
		},
	},
	{
		isMatched: false,
		level: 3,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '6',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'Python',
			admin: false,
			__v: 0,
		},
	}, // primary language, different levels
	{
		isMatched: false,
		level: 1,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '7',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'JavaScript',
			secondaryLanguage: 'C++',
			admin: false,
			__v: 0,
		},
	}, // should match by primary language.
	{
		isMatched: false,
		level: 3,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '8',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Python',
			secondaryLanguage: 'Python',
			admin: false,
			__v: 0,
		},
	}, // should match by primary language
	{
		isMatched: false,
		level: 2,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '9',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Python',
			secondaryLanguage: 'Go',
			admin: false,
			__v: 0,
		},
	},
	{
		isMatched: false,
		level: 2,
		_id: '5ea0f23c983f168155d3670b',
		attendee: {
			_id: '10',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Python',
			secondaryLanguage: 'JavaScript',
			admin: false,
			__v: 0,
		},
	}, // primary language and level match.
];

///////////////////
// Pablo's Attempt
///////////////////
// console.log('original::: ', attendees);
// loop through the rest using case 1,
// if there is a match, you store both in array array of matches,
// changed users to ismatched = true
// restart the loop to find the next unmatched user.
// repeat.
// let matches = [];
// let autoMatch = (array) => {
// 	let attendee1 = '';
// 	let attendee2 = '';
// 	let match = {
// 		user1: null,
// 		user2: null,
// 	};
// 	// loop array of unmatched,  keep track of first attendee where isMatched = false
// 	let currentLanguage = '';
// 	let currentLevel = '';
// 	for (let i = 0; i < array.length; i++) {
// 		if (array[i].isMatched === false) {
// 			match.user1 = array[i].attendee._id;
// 			attendee1 = array[i]._id;
// 			currentLanguage = array[i].attendee.primaryLanguage;
// 			console.log(
// 				'OUTPUT: : autoMatch -> currentLanguage',
// 				currentLanguage
// 			);
// 			currentLevel = array[i].level;
// 			// console.log('OUTPUT: : autoMatch -> currentLevel', currentLevel);

// 			array.splice(i, 1);
// 			// console.log('array after splice().....', array);

// 			break;
// 		}
// 	}
// 	for (let j = 0; j < array.length; j++) {
// 		if (array[j].isMatched === false) {
// 			if (
// 				array[j].level === currentLevel &&
// 				array[j].attendee.primaryLanguage === currentLanguage
// 			) {
// 				attendee2 = array[j]._id;
// 				match.user2 = array[j].attendee._id;

// 				array.splice(j, 1);
// 				// store match to db.event
// 				matches.push(match);

// 				break;
// 			}
// 		}
// 	}
// 	currentLanguage = '';
// 	// console.log('OUTPUT: : autoMatch -> currentLanguage', currentLanguage);
// 	currentLevel = '';
// 	// console.log('OUTPUT: : autoMatch -> currentLevel', currentLevel);
// 	// console.log('attendee1...... ', attendee1);
// 	// console.log('attendee2...... ', attendee2);
// 	// set attendee isMatched to true
// 	// store match to matches in event db
// 	// call function again
// 	// return
// 	// console.log('match....', match);
// 	// console.log('currentLanguage.....', currentLanguage);
// 	// console.log('currentLevel.......', currentLevel);
// 	// console.log('matches....', matches);
// 	// console.log('====== ARRAY ======  ', array);
// };
// autoMatch(attendees);

///////////////////
// Pablo's Attempt
///////////////////

////////////////////
// Steven's Attempt
////////////////////n

let matches = [];

function autoPair(arr, counter) {
	let newArr = [];
	newArr = arr;
	let arrayCounter = counter;
	let currIndex = 0;
	let level = 0;
	let primaryLang = '';

	for (let i = 0; i < newArr.length; i++) {
		let attendee = newArr[i];
		if (attendee.isMatched === false) {
			currIndex = i;
			level = attendee.level;
			primaryLang = attendee.attendee.primaryLanguage;
			break;
		}
	}

	for (let j = currIndex + 1; j < newArr.length; j++) {
		if (
			newArr[j].isMatched === false &&
			level === newArr[j].level &&
			primaryLang === newArr[j].attendee.primaryLanguage
		) {
			let match = {
				user1: newArr[currIndex].attendee._id,
				user2: newArr[j].attendee._id,
			};
			// db//
			// update to event.attendees
			newArr[j].isMatched = true;
			newArr[currIndex].isMatched = true;
			// update to event.matches
			matches.push(match);
			break;
			// db//
		}
	}

	if (arrayCounter <= newArr.length) {
		arrayCounter = arrayCounter + 1;
		autoPair(newArr, arrayCounter);
	} else {
		return;
	}
}

autoPair(attendees, 1);
console.log('Paired Matches:', matches);

////////////////////
// Steven's Attempt
////////////////////
