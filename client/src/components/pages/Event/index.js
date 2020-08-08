import React, { Fragment, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
// import { Jumbotron, Button } from 'react-bootstrap';

import EventCard from '../../EventCard'

import './style.scss'

import events from '../../../0-temp-data/events'

import AuthContext from '../../../context/auth/authContext'

const Event = () => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, user } = authContext
	const [socket, setSocket] = useState(null)
	const [socketConnected, setSocketConnected] = useState(false)
  const [dt, setDt] = useState('');
	// establish socket connection
	useEffect(() => {
		setSocket(io('http://localhost:5005'))
	}, [])

	// subscribe to the socket event
	useEffect(() => {
		if (!socket) return

		socket.on('connect', () => {
			setSocketConnected(socket.connected)
			subscribeToDateEvent()
		})
		socket.on('disconnect', () => {
			setSocketConnected(socket.connected)
    })
    
    socket.on("getDate", data => {
      setDt(data);
    });
	}, [socket])

	// subscribe to socket date event
	const subscribeToDateEvent = (interval = 1000) => {
		socket.emit('subscribeToDateEvent', interval)
	}

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
				<h2>
					Event
				</h2>
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
        <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
			</Container>
		</Fragment>
	)
}

export default Event
