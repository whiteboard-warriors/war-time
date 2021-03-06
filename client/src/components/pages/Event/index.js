import React, { Fragment, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

import PairCard from './PairCard';
import ParticipantCard from './ParticipantCard';

import Container from 'react-bootstrap/Container';

// import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import EventContext from '../../../context/event/eventContext';

import './style.scss';
//temp data
import events from '../../../0-temp-data/events';

const Event = (props) => {
	// const authContext = useContext(AuthContext)
	const [socket, setSocket] = useState(null);
	const [socketConnected, setSocketConnected] = useState(false);
	const [dt, setDt] = useState('');
	const location = useLocation();
	const eventContext = useContext(EventContext);
	const authContext = useContext(AuthContext);
	const { user } = authContext;
	const { getEventBySlug, event } = eventContext;

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
		);

		let pathSlug = location.pathname.replace('/event/', '');

		getEventBySlug(pathSlug);
		// eslint-disable-next-line
	}, []);

	/**
	 *
	 */
	useEffect(() => {
		if (!socket) return;

		/**
		 *
		 * @param {*} socketId
		 * @param {*} userId
		 * @param {*} eventId
		 */
		const joinEvent = (socketId, userId, eventId) => {
			socket.emit('joinEvent', socketId, userId, eventId);
		};

		/**
		 *
		 */
		socket.on('connect', () => {
			setSocketConnected(socket.connected);
		});

		/**
		 *
		 */
		socket.on('disconnect', () => {
			setSocketConnected(socket.connected);
		});

		/**
		 *
		 */
		socket.on('getDate', (data) => {
			setDt(data);
		});

		if (event) {
			console.info('joining event');
			joinEvent(socket.id, user._id, event._id);
		}
	}, [user, socket, event]);

	// manage socket connection
	const handleSocketConnection = () => {
		if (socketConnected) socket.disconnect();
		else {
			socket.connect();
		}
	};

	console.log(events[0]);

	return (
		<Fragment>
			<Container fluid>
				<div className='container-root'>
					<div className='pairs-container'>
						<div className='text-center pb-3'>
							<h4>Pairs</h4>
						</div>
						<hr />
						<div className='pair-grid'>
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
								);
							})}
						</div>
					</div>
					<div className='participant-containers'>
						<div className='text-center pb-3'>
							<h4>Participants</h4>
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
							);
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
					type='button'
					style={{ marginTop: 10 }}
					value={socketConnected ? 'Disconnect' : 'Connect'}
					onClick={handleSocketConnection}
				/>
				<div style={{ marginTop: 20 }}>
					<b>Date: </b> {dt}
				</div>
			</Container>
		</Fragment>
	);
};

export default Event;
