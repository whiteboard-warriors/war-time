const db = require('../models')
const attendanceService = require('../service/attendanceservice')
const socket = (io) => {
	io.on('connection', (client) => {
		// console.log('New Connection: ' + this.socket.id)

		// socket event for client subscription
		client.on('subscribeToDateEvent', (interval) => {
			console.log('Client is subscribing with interval: ', interval)

			// emit message to the client side
			setInterval(() => {
				client.emit('getDate', new Date().toUTCString())
			}, interval)
		})

		/**
		 *
		 */
		client.on('joinEvent', async (socketId, userId, eventId) => {
			try {
				console.log(
					'SocketId: ' +
						socketId +
						' User: ' +
						userId +
						' joined event Id: ' +
						eventId
				)

				let attendance = await db.Attendance.findOne({
					user: userId,
					event: eventId,
				})

				// socket has changed or reconnected for some reason
				if (
					attendance != null &&
					(attendance.socket !== socketId ||
						attendance.status === 'TIMEOUT')
				) {
					attendance.socket = socketId
					attendance.status = 'CONNECTED'
					attendance = await db.Attendance.findByIdAndUpdate(
						{ _id: attendance._id },
						{ $set: attendance }
					)
				} else {
					attendance = new db.Attendance({
						socket: socketId,
						user: userId,
						event: eventId,
						createdAt: new Date(),
						status: 'CONNECTED',
					})
					attendance = await attendance.save()
				}

				// kick-off pairing process ()
			} catch (err) {
				console.error('Error joining event: ' + err)
			}
		})

		client.on('disconnecting', async () => {
			let attendance = await db.Attendance.findOne({
				socket: client.id,
			})
			if (attendance != null) {
				console.info(
					'disconnect attendance: ' + JSON.stringify(attendance)
				)
				attendance.status = 'TIMEOUT'
				await attendance.save()
				attendanceService.timeoutAttendee(attendance._id)
			} else {
				console.info(
					'Disconnected: ' + client.id + ' no attendance record found'
				)
			}
			// const rooms = Object.keys(client.rooms)
			// the rooms array contains at least the socket ID
		})

		client.on('disconnect', (socket) => {})
	})
}

module.exports = socket
