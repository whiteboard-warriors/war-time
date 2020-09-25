import React, { Fragment, useContext, useEffect } from 'react';
// Moment JS
import moment from 'moment';
// Bootstrap
import Container from 'react-bootstrap/Container';
// Containers
import EventCard from '../../EventCard';
// Style
import './style.scss';
import wwLogo from './ww-logo.svg';
// Temp data
// import events from '../../../0-temp-data/events';
// State
import AuthContext from '../../../context/auth/authContext';
import EventContext from '../../../context/event/eventContext';
import AlertContext from '../../../context/alert/alertContext';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const eventContext = useContext(EventContext);
	const alertContext = useContext(AlertContext);

	const { isAuthenticated, user } = authContext;
	const { getEvents, events } = eventContext;
	const { setAlert } = alertContext;

	console.log(events);

	useEffect(() => {
		if (!isAuthenticated) {
			setAlert(
				'Oops, you need to login first before performing this action.!',
				'danger'
			);
			props.history.push('/login');
		}

		getEvents();
		//eslint-disable-next-line
	}, [props, setAlert, isAuthenticated]);

	return (
		<Fragment>
			<div className='text-center mt-5'>
				{user.firstName && <h4>Welcome, {user.firstName}!</h4>}
			</div>
			<Container className='mt-5 event-card-container'>
				{events &&
					events.map((event) => {
						console.log('events, home page >> ', event);
						let parsedDate = moment(event.dateTime);
						let date = parsedDate.utc().format('MMMM Do YYYY');
						let time = parsedDate.utc().format('h:mm a');

						return (
							<EventCard
								key={event._id}
								title={event.title}
								image={wwLogo}
								location={event.onlinePlatform}
								date={date}
								time={time}
								slug={event.slug}
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
