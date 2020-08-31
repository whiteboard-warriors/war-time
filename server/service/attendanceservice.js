const TIMEOUT = 15000 // 15 seconds
const db = require('../models')
/**
 * After a X seconds of inactivity remove attendee and "re-pair"
 * any partners
 * @param {*} attendance
 */
const timeoutAttendee = async (attendanceId) => {
	let action = async () => {
		// after timeout period, if attendance has not been set to
		// reconnected, set to "DISCONNECTED"
		let attendance = await db.Attendance.findOne({ _id: attendanceId })

		if (attendance !== null && attendance.status === 'TIMEOUT') {
			attendance.status = 'DISCONNECTED'
			await attendance.save()
		}
	}

	let timeout = setTimeout(() => {
		action()
	}, TIMEOUT)
}

module.exports = { timeoutAttendee }
