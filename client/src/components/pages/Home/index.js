import React, { Fragment, useContext } from 'react';

import Container from 'react-bootstrap/Container';
// import { Jumbotron, Button } from 'react-bootstrap';

import EventCard from '../../EventCard';

import './style.scss';
import wwLogo from './ww-logo.svg';

import events from '../../../0-temp-data/events';

import AuthContext from '../../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

	// const authGreeting = (
	// 	<Fragment>
	// 		Hi {user.firstName}! Thanks for joining Whiteboard Warriors!!! 👍
	// 	</Fragment>
	// );

	// const landingGreeting = (
	// 	<Fragment>
	// 		Welcome to War-Time the Whiteboard Warriors Meet-Up App!
	// 	</Fragment>
	// );

	// temp actions
	const deleteEvent = function () {
		console.log('event deleted');
	};
	const pair = function () {
		console.log('event paired');
	};
	const edit = function () {
		console.log('event edited');
	};
	// const signIn = function () {
	// 	console.log('used signed in');
	// };

	return (
		<Fragment>
			<div className='text-center mt-5'>
				{user.firstName && <h4>Welcome, {user.firstName}!</h4>}
			</div>
			<Container className='mt-5 event-card-container'>
				{user.firstName &&
					events.map((item) => {
						return (
							<EventCard
								image={wwLogo}
								location={item.location}
								date={item.date}
								time={item.time}
								deleteEvent={deleteEvent}
								pair={pair}
								edit={edit}
							/>
						);
					})}
			</Container>
			{/* <Jumbotron>
				<h1>Welcome!</h1>
				<p>{isAuthenticated ? authGreeting : landingGreeting}</p>
				<p>
					<Button variant='primary'>Events</Button>
				</p>
			</Jumbotron> */}
		</Fragment>
	);
};

export default Home;
