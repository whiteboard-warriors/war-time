import React, { Fragment, useContext, useEffect } from 'react';
// Moment JS
import moment from 'moment';
// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// Containers
import EventCard from '../../EventCard';
import EventFilter from './EventFilter';
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
	const { getEvents, events, filtered, loading } = eventContext;
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

	if (events !== null && events.length === 0 && !loading) {
		return (
			<Container>
				<div className='text-center my-5'>
					{user.firstName && <h4>Welcome, {user.firstName}!</h4>}
				</div>
				<hr />
				<div className='text-center my-5'>
					<h3>
						No upcoming events yet{' '}
						<span role='img' aria-label='smiley emoji'>
							{' '}
							😃
						</span>
					</h3>
				</div>
			</Container>
		);
	}

	return (
		<Fragment>
			<div className='text-center my-5'>
				{user.firstName && <h4>Welcome, {user.firstName}!</h4>}
			</div>
			<Container>
				<Row>
					<Col md={{ span: 6, offset: 3 }}>
						<EventFilter />
					</Col>
				</Row>
			</Container>
			<Container className='mt-4 event-card-container'>
				{events ? (
					filtered !== null ? (
						filtered.map((event) => {
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
						})
					) : (
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
						})
					)
				) : (
					<p>loader</p>
				)}
			</Container>
		</Fragment>
	);
};

export default Home;
