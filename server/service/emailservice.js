const AWS = require('aws-sdk')
const config = require('../../awsconfig')
AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

/**
 *
 */
const sendWelcomeConfirmation = (userEmail) => {
	sendEmail(
		userEmail,
		'Welcome to Whiteboard Warriors',
		'Welcome to Whiteboard Warriors!',
		'Whiteboard Warriors <noreply@whiteboardwarriors.org>'
	)
}

/**
 *
 * @param {*} userEmail
 */
const sendPasswordResetEmail = (userEmail, resetToken) => {
	sendEmail(
		userEmail,
		'Password Reset 🔐',
		'You have requested to reset your Whiteboard Warriors password, please use the following link: \n\n' +
			'https://wartime.whiteboardwarriors.org/password-reset?token=' +
			resetToken +
			'\n\n🔴 If you did not request this change please ignore this email! 🔴',
		'Whiteboard Warriors <noreply@whiteboardwarriors.org>'
	)
}

/**
 * 
 * @param {*} to 
 * @param {*} subject 
 * @param {*} message 
 * @param {*} from 
 */
const sendEmail = (to, subject, message, from) => {
	const params = {
		Destination: {
			ToAddresses: [to],
		},
		Message: {
			Body: {
				// Html: {
				//     Charset: 'UTF-8',
				//     Data: message
				// },
				//replace Html attribute with the following if you want to send plain text emails.
				Text: {
					Charset: 'UTF-8',
					Data: message,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	}

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack)
		} else {
			console.log('Email sent.', data)
		}
	})
}

module.exports = { sendWelcomeConfirmation, sendPasswordResetEmail }
