const socket = (io) => {
	io.on('connection', (client) => {
		console.log('New Connection')

		// socket event for client subscription
		client.on('subscribeToDateEvent', (interval) => {
			console.log('Client is subscribing with interval: ', interval)

			// emit message to the client side
			setInterval(() => {
				client.emit('getDate', new Date().toUTCString())
			}, interval)
		})

		client.on('joinEvent', (userId, eventId) => {
			console.log('User joined event Id: ' + eventId)

			// search for current attendees based on userId

			//
			let eventAttendees = {
				userId: userId,
				eventId: eventId,
				// socketId: client.socketId
			}

			// kick-off pairing process ()
		})
	})

	io.on('disconnect', (client) => {
		// find client's socketid that was closed, and remove them from
		// event after 2 minute inactivity
		// setInterval to remove user after some period of inactivity
	})
}

module.exports = socket
