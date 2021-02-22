import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import io from 'socket.io-client'

import PairCard from './PairCard'
import ParticipantCard from './ParticipantCard'
import Container from 'react-bootstrap/Container'
import AuthContext from '../../../context/auth/authContext'
import EventContext from '../../../context/event/eventContext'

import './style.scss'
//temp data
import events from '../../../0-temp-data/events'

// when someone joins wait before refreshing participant list
let participantRefreshTimeout

const Event = (props) => {
	// const authContext = useContext(AuthContext)
	const [socket, setSocket] = useState(null)
	const [socketConnected, setSocketConnected] = useState(false)
	const [joined, setJoined] = useState(false)
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

		// eslint-disable-next-line
	}, [])

	/**
	 *
	 */
	const handleParticipantJoined = (participant) => {
		let message =
			participant.firstName +
			' joined! Welcome ' +
			participant.firstName +
			' 👋'
		toast(message)

		refreshParticipantList()
	}

	/**
	 *
	 */
	const refreshParticipantList = () => {
		if (participantRefreshTimeout) clearTimeout(participantRefreshTimeout)
		setTimeout(() => {}, 500)
	}

	/**
	 *
	 */
	useEffect(() => {
		if (!socket) return

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

		// make sure not to run this more then once or multiple listeners
		// will be attached to the same event
		if (!joined && event && socket.id) {
			/**
			 *
			 * @param {*} socketId
			 * @param {*} userId
			 * @param {*} eventId
			 */
			const joinEvent = (socketId, userId, eventId) => {
				socket.emit('joinEvent', socketId, userId, eventId)
			}

			setJoined(true)
			joinEvent(socket.id, user._id, event._id)

			/**
			 *
			 */
			socket.on('participantJoined', (participant) => {
				console.info('Joined: ' + JSON.stringify(participant))
				handleParticipantJoined(participant)
			})
		}
	}, [user, socket, event, handleParticipantJoined, joined, setJoined])

	// manage socket connection
	const handleSocketConnection = () => {
		if (socketConnected) socket.disconnect()
		else {
			socket.connect()
		}
	}

	/**
	 *
	 */
	return (
		<Fragment>
			<Container fluid>
				<ToastContainer />
				<div className="container-root">
					<div className="pairs-container">
						<div className="text-center pb-3">
							<h4>Pairs</h4>
						</div>
						<hr />
						<div className="pair-grid">
							{events[0].matches.map((match, index) => {
								return (
									<PairCard
										key={index}
										language={match.language}
										user1={`${match.user1.firstName} ${match.user1.lastName}`}
										user2={`${match.user2.firstName} ${match.user2.lastName}`}
										skillLevel={match.level}
										docLink={match.docLink}
									/>
								)
							})}
						</div>
					</div>
					<div className="participant-containers">
						<div className="text-center pb-3">
							<h4>
								Participants{' '}
								{event ? (
									<span>{event.attendees.length}</span>
								) : (
									<span></span>
								)}
							</h4>
						</div>
						<hr />
						{events[0].attendees.map((attendeeObj, index) => {
							return (
								<ParticipantCard
									key={index}
									imageLink={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${
										index + 1
									}.jpg`}
									firstName={attendeeObj.attendee.firstName}
									lastName={attendeeObj.attendee.lastName}
									primaryLanguage={
										attendeeObj.attendee.primaryLanguage
									}
								/>
							)
						})}
					</div>
				</div>
				<hr />
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
