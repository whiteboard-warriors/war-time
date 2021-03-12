import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
// import LocationContext from '../../../../context/location/locationContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import EventContext from '../../../../context/event/eventContext';
import './style.scss';
/**
 *
 * @param {*} props
 */
const CreateEvent = (props) => {
	const alertContext = useContext(AlertContext);
	const eventContext = useContext(EventContext);
	const authContext = useContext(AuthContext);
	// const locationContext = useContext(LocationContext);

	const { setAlert } = alertContext;
	const { isAuthenticated } = authContext;
	const {
		createEvent,
		clearCreateEventFlags,
		error,
		clearEventError,
		saveSuccess,
	} = eventContext;
	// const { locationError, locations, getLocations } = locationContext;
	useEffect(() => {
		// getLocations();

		if (isAuthenticated) {
			props.history.push('/admin/create-event');
		}

		if (!isAuthenticated) {
			setAlert('Please login before completing action.', 'danger');
			props.history.push('/login');
		}

		if (error === 'You are not authorized to create events.') {
			setAlert(error, 'danger');
			clearEventError();
		}

		if (error != null && error.indexOf('title_1 dup key') !== -1) {
			setAlert('Event name is not unique, please try again!', 'danger');
			clearEventError();
		}

		if (saveSuccess) {
			setAlert('Your new event has been created.', 'success');
			clearCreateEventFlags();
			// debugger;
			props.history.push('/admin');
		}

		// if (locationError) {
		// 	setAlert(locationError, 'danger');
		// 	clearEventError();
		// }
		// eslint-disable-next-line
	}, [
		error,
		saveSuccess,
		isAuthenticated,
		clearCreateEventFlags,
		clearEventError,
		// locationError,
		setAlert,
		props.history,
	]);

	const [event, setEvent] = useState({
		title: '',
		dateTime: '',
		locations: '',
		onlinePlatform: '',
	});

	const { title, dateTime, onlinePlatform } = event;

	const onChange = (e) => {
		setEvent({ ...event, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createEvent({
			title,
			dateTime,
			onlinePlatform,
		});
	};

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

						<div className='d-flex my-3 justify-content-around'>
							<Button variant='warning' type='submit' size='lg'>
								Create Event
							</Button>
							<Link className='btn btn-danger btn-lg' to='/admin'>
								Cancel
							</Link>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateEvent;
