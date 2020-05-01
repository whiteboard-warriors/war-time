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
			_id: '5e9cc061c7c28c2c3a26ce33',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Javascript ',
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
			_id: '5e9f5def12c86e55649b4c2b',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Javascript',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
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
			_id: '5e9f5def12c86e55649b4c2b',
			firstName: 'Kate',
			lastName: 'Smith',
			email: 'ksmith@gmail.com',
			password:
				'$2a$10$QRfORzlKnwyqSL5SksbOROiJmk29AVtrHydX2a2ZZIqfmwp58afPW',
			slackUsername: '@Kate Smith',
			linkedIn: 'linkedin.com/in/katesmith',
			primaryLanguage: 'Python ',
			secondaryLanguage: 'JavaScript',
			admin: false,
			__v: 0,
		},
	}, // primary language and level match.
];

///////////////////
// Pablo's Attempt
///////////////////
console.log('original::: ', attendees);
// loop through the rest using case 1,
// if there is a match, you store both in array array of matches,
// changed users to ismatched = true
// restart the loop to find the next unmatched user.
// repeat.
// let matches = {};
// let autoMatch = (array) => {
// 	let currentCheck = [];
// 	// loop array of unmatched,  keep track of first attendee where isMatched = false
// 	for (let i = 0; i < array.length; i++) {
// 		if (array[i].isMatched === false) {
// 			currentCheck = array[i];
// 			// array[i].isMatched = true;
// 			console.log(currentCheck);
// 		}
// 		for (let j = 1; j < array.length; j++) {
// 			if (
// 				currentCheck.attendee.primaryLanguage ===
// 					array[j].attendee.primaryLanguage &&
// 				currentCheck.level === array[j].level
// 			) {
// 				matches.user1 = currentCheck.attendee._id;
// 				matches.user2 = array[j].attendee._id;
// 				array;
// 			}
// 		}
// 	}
// 	console.log(object);
// };
// autoMatch(attendees);

///////////////////
// Pablo's Attempt
///////////////////
