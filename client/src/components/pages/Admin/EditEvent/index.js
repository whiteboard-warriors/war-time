import React, { useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> origin/master
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
// import LocationContext from '../../../../context/location/locationContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import EventContext from '../../../../context/event/eventContext';

import moment from 'moment';

import './style.scss';
/**
 *
 * @param {*} props
 */
const EditEvent = (props) => {
	const alertContext = useContext(AlertContext);
	const eventContext = useContext(EventContext);
	const authContext = useContext(AuthContext);
	// const locationContext = useContext(LocationContext);

	const { setAlert, clearErrors } = alertContext;
	const { isAuthenticated } = authContext;
	const {
<<<<<<< HEAD
		event,
=======
		// event,
		events,
>>>>>>> origin/master
		updateEvent,
		getEvent,
		clearCreateEventFlags,
		error,
		saveSuccess,
	} = eventContext;
<<<<<<< HEAD
	console.log('31 event > ', event);
=======
>>>>>>> origin/master

	// const { locationError, locations, getLocations } = locationContext;
	useEffect(() => {
		getEvent(props.match.params.id);
		// getLocations();

		if (!isAuthenticated) {
			setAlert('Please login before completing action.', 'danger');
			props.history.push('/login');
		}

		if (error === 'You are not authorized to create events.') {
			setAlert(error, 'danger');
		}

		if (error != null && error.indexOf('title_1 dup key') !== -1) {
			setAlert('Event name is not unique, please try again!', 'danger');
		}

		if (saveSuccess) {
<<<<<<< HEAD
			setAlert('Event has been created.', 'success');
			clearCreateEventFlags();
			debugger;
=======
			setAlert('Event has been updated.', 'success');
			clearCreateEventFlags();
			// debugger;
>>>>>>> origin/master
			props.history.push('/admin');
		}

		// if (locationError) {
		// 	setAlert(locationError, 'danger');
		// 	clearErrors();
		// }
		// eslint-disable-next-line
	}, [
		error,
		saveSuccess,
		isAuthenticated,
		// clearCreateEventFlags,
		clearErrors,
		// locationError,
		setAlert,
		// props.history,
	]);
<<<<<<< HEAD

	let parsedDate = moment(event && event.dateTime).format('YYYY-MM-DDThh:ss');
	console.log(parsedDate);
	// let date = parsedDate.utc().format('MM/DD/YYYY');
	// let time = parsedDate.utc().format('hh:mm A');
	// let savedDateTime = `${date}, ${time}`;
=======
	let filteredEvent = events.filter(
		(event) => event._id === props.match.params.id
	);
	let event = filteredEvent[0];

	let parsedDate = moment(event && event.dateTime).format('YYYY-MM-DDThh:mm');
>>>>>>> origin/master

	const [currentEvent, setCurrentEvent] = useState({
		title: event && event.title,
		dateTime: parsedDate, //use moment to extract date and time.,
		// locations: location,
		onlinePlatform: event && event.onlinePlatform,
	});

	// console.log('85 date and time >> ', `${date}, ${time}`);

	const { title, dateTime, onlinePlatform } = currentEvent;

	const onChange = (e) => {
		setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		updateEvent({
<<<<<<< HEAD
=======
			_id: props.match.params.id,
>>>>>>> origin/master
			title,
			dateTime,
			onlinePlatform,
		});
<<<<<<< HEAD
		console.log('Event will be updated');
	};

	// console.log('locaitons >>> ', locations);

=======
	};

>>>>>>> origin/master
	return (
		<Container>
			<div className='text-center'>
				<h3 className='mt-5 mb-3'>Create Event</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className='form-custom-margin'>
						<Form.Group controlId='formBasicState'>
							<Form.Control
								type='text'
								placeholder='Title'
								value={title}
								onChange={onChange}
								name='title'
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Control
								type='datetime-local'
								placeholder='Start Time'
								value={dateTime}
								onChange={onChange}
								name='dateTime'
							></Form.Control>
						</Form.Group>

						{/* <Form.Group controlId='formBasicState'>
							<Form.Control
								type='text'
								placeholder='Locations*'
								defaultValue='Locations*'
								// value={location}
								onChange={onChange}
								name='location'
								as='select'
							>
								<option value={null}>Locations</option>
								{locations ? (
									locations.map((location) => {
										return (
											<option
												key={location._id}
												value={`${location.name}, ${location.city} - ${location.state}`}
											>{`${location.name}, ${location.city} - ${location.state}`}</option>
										);
									})
								) : (
									<option>
										Admin, you need to add a locations
									</option>
								)}
							</Form.Control>
						</Form.Group> */}

						<Form.Group controlId='formBasicOnlinePlatform'>
							<Form.Control
								type='text'
								placeholder='Online Platform'
								value={onlinePlatform}
								onChange={onChange}
								name='onlinePlatform'
							/>
						</Form.Group>

<<<<<<< HEAD
						<div className='text-center my-3'>
							<Button variant='primary' type='submit' size='lg'>
								Edit Event
							</Button>
=======
						<div className='btn-edit-container'>
							<Button
								variant='primary'
								type='submit'
								size='lg'
								className='mr-3'
							>
								Edit Event
							</Button>
							<Link
								data-rb-event-key='/admin'
								className='btn btn-lg btn-danger'
								to='/admin'
							>
								{' '}
								Cancel
							</Link>
>>>>>>> origin/master
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default EditEvent;
