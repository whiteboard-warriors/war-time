import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Moment JS
import moment from 'moment';

import { Container, Button, Form } from 'react-bootstrap';

import EventCard from '../../EventCard';
import Spinner from '../../Spinner';

import './style.scss';
// // Images
import wwLogo from './ww-logo.svg';
// State
<<<<<<< HEAD
=======
import AlertContext from '../../../context/alert/alertContext';
>>>>>>> origin/master
import AuthContext from '../../../context/auth/authContext';
import EventContext from '../../../context/event/eventContext';
//temp data
import languages from '../../../0-temp-data/languages';
import locations from '../../../0-temp-data/locations';

const Admin = (props) => {
	const alertContext = useContext(AlertContext);
	const { setAlert, clearErrors } = alertContext;
	const authContext = useContext(AuthContext);
<<<<<<< HEAD
	const { user } = authContext;
	const eventContext = useContext(EventContext);
	const { events } = eventContext;
	console.log('25 events >> ', events && events);

	// temp actions
	// const deleteEvent = function () {
	// 	console.log('event deleted');
	// };
	// const pair = function () {
	// 	console.log('event paired');
	// };
	// const edit = function () {
	// 	console.log('event edited');
	// };
	// const signIn = function () {
	// 	console.log('used signed in');
	// };
=======
	const { user, isAuthenticated } = authContext;
	const eventContext = useContext(EventContext);
	const {
		events,
		getEvents,
		clearCreateEventFlags,
		error,
		// saveSuccess,
		deleteSuccess,
	} = eventContext;

	useEffect(() => {
		getEvents();

		if (isAuthenticated) {
			props.history.push('/admin');
		}

		if (!isAuthenticated) {
			setAlert('Please login before completing action.', 'danger');
			props.history.push('/login');
		}

		if (error === 'You are not authorized to create events.') {
			setAlert(error, 'danger');
			props.history.push('/');
		}

		if (deleteSuccess) {
			setAlert('Your event has been created.', 'danger');
			clearCreateEventFlags();
			// debugger;
			props.history.push('/admin');
		}

		// if (saveSuccess) {
		// 	setAlert('Event has been created.', 'success');
		// 	clearCreateEventFlags();
		// 	// debugger;
		// 	props.history.push('/admin');
		// }

		// if (locationError) {
		// 	setAlert(locationError, 'danger');
		// 	clearErrors();
		// }
		// eslint-disable-next-line
	}, [
		error,
		// saveSuccess,
		isAuthenticated,
		// clearCreateEventFlags,
		deleteSuccess,
		clearErrors,
		// locationError,
		setAlert,
		props.history,
	]);
>>>>>>> origin/master

	return (
		<Fragment>
			<Container className='mt-5 admin-page-container text-center'>
				<div className='mt-5'>
					{user.firstName && <h4>Welcome, {user.firstName}!</h4>}
				</div>
				<div className='mt-5 admin-action-container'>
					<div>
						<h3 className='my-4'>Admin</h3>
						<div className='admin-action-card text-center'>
							<div className='admin-create-buttons'>
								<Link to='/admin/create-event'>
									<Button variant='warning'>
										Create Event
									</Button>
								</Link>
								<Link to='/admin/add-location'>
									<Button variant='warning'>
										Add Location
									</Button>
								</Link>
								<Link to='/admin/add-language'>
									<Button variant='warning'>
										Add Language
									</Button>
								</Link>
							</div>
						</div>
					</div>
					{/* -- Locations Card --  */}
					<div>
						<h3 className='my-4'>Locations</h3>
						<div className='admin-action-card text-center'>
							<Form className='admin-search-form'>
								<Form.Group controlId='formBasicPassword'>
									<Form.Control
										type='search'
										placeholder='Search Locations'
									/>
								</Form.Group>

								<Button variant='primary' type='submit'>
									<i className='fa fa-search'></i>
								</Button>
							</Form>
							<div className='location-card-container'>
								{locations &&
									locations.map((location, index) => {
										return (
											<div
												key={index}
												className='location-card'
											>
												<p>
													{location.name},{' '}
													{location.city} -{' '}
													{location.state}
												</p>
												<div>
													<a href='/admin'>
														<i className='fa fa-pen'></i>
													</a>

													<a href='/admin'>
														<i className='fa fa-trash'></i>
													</a>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</div>
					{/* -- Language Card --  */}
					<div>
						<h3 className='my-4'>Languages</h3>
						<div className='admin-action-card text-center'>
							<div className='language-card-container'>
								<div className='language-card-container'>
									{languages &&
										languages.map((item, index) => {
											return (
												<div
													key={index}
													className='language-card'
												>
													<p>{item.language}</p>
													<div>
														<a href='/admin'>
															<i className='fa fa-pen'></i>
														</a>

														<a href='/admin'>
															<i className='fa fa-trash'></i>
														</a>
													</div>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-5'>
					<div className='text-center'>
						<h3>Events</h3>
					</div>
					<div className='mt-3 admin-card-container'>
<<<<<<< HEAD
						{events &&
=======
						{events ? (
>>>>>>> origin/master
							events.map((event) => {
								let parsedDate = moment(event.dateTime);
								let date = parsedDate
									.utc()
									.format('MMMM Do YYYY');
								let time = parsedDate.utc().format('h:mm a');
								return (
									<EventCard
										key={event._id}
										title={event.title}
										location={event.onlinePlatform}
										eventId={event._id}
										image={wwLogo}
										date={date}
										time={time}
									/>
								);
							})
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</Container>
		</Fragment>
	);
};

export default Admin;
