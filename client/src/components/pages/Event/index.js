import React, { Fragment, useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import AuthContext from '../../../context/auth/authContext'
import EventContext from '../../../context/event/eventContext'

import Container from 'react-bootstrap/Container'

import './style.scss'

const Event = (props) => {
	// const authContext = useContext(AuthContext)
	const [socket, setSocket] = useState(null)
	const [socketConnected, setSocketConnected] = useState(false)
	const [dt, setDt] = useState('')
	const location = useLocation()
	const eventContext = useContext(EventContext)
	const authContext = useContext(AuthContext)
	const { user } = authContext
	const { getEventBySlug, event } = eventContext

	// establish socket connection
	useEffect(() => {
		setSocket(
			io(
				window.location.protocol +
					'//' +
					window.location.hostname +
					(window.location.hostname.indexOf('localhost') !== -1
						? ':5005'
						: '')
			),
			{ transports: ['websocket'] }
		)

		let pathSlug = location.pathname.replace('/event/', '')

		getEventBySlug(pathSlug)
	}, [])

	/**
	 *
	 */
	useEffect(() => {
		if (!socket) return

		/**
		 *
		 * @param {*} socketId
		 * @param {*} userId
		 * @param {*} eventId
		 */
		const joinEvent = (socketId, userId, eventId) => {
			socket.emit('joinEvent', socketId, userId, eventId)
		}

		/**
		 *
		 */
		socket.on('connect', () => {
			setSocketConnected(socket.connected)
		})

		/**
		 *
		 */
		socket.on('disconnect', () => {
			setSocketConnected(socket.connected)
		})

		/**
		 *
		 */
		socket.on('getDate', (data) => {
			setDt(data)
		})

		if (event) {
			console.info('joining event')
			joinEvent(socket.id, user._id, event._id)
		}
	}, [user, socket, event])

	// manage socket connection
	const handleSocketConnection = () => {
		if (socketConnected) socket.disconnect()
		else {
			socket.connect()
		}
	}

	return (
		<Fragment>
			<Container>
				<h2>Event</h2>
				<div>
					<b>Connection status:</b>{' '}
					{socketConnected ? 'Connected' : 'Disconnected'}
				</div>
				<input
					type="button"
					style={{ marginTop: 10 }}
					value={socketConnected ? 'Disconnect' : 'Connect'}
					onClick={handleSocketConnection}
				/>
				<div style={{ marginTop: 20 }}>
					<b>Date: </b> {dt}
				</div>
			</Container>
		</Fragment>
	)
}

export default Event
