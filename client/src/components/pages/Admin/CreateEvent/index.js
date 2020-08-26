import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import LocationContext from '../../../../context/location/locationContext';
import EventContext from '../../../../context/event/eventContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// import statesAndRegions from '../AddLocation/statesAndRegions';

import './style.scss';

const CreateEvent = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const locationContext = useContext(LocationContext);
	const eventContext = useContext(EventContext);

	const { setAlert } = alertContext;
	const { error, clearErrors, isAuthenticated } = authContext;
	const { locationError, getLocations, locations } = locationContext;
	const { createEvent } = eventContext;

	useEffect(() => {
		if (isAuthenticated) {
			getLocations();
			props.history.push('/admin/create-event');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}

		if (locationError) {
			setAlert(locationError, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [event, setEvent] = useState({
		location: '',
		date: '',
		startTime: '',
		endTime: '',
		languages: '',
		levels: '',
	});

	const { location, date, startTime, endTime, languages, levels } = event;
	// console.log('locations >>> ', locations);
	// console.log('location >>> ', location);
	// console.log('date >>> ', date);
	// console.log('startTime >>>', startTime);
	// console.log('endTime >>>', endTime);
	// console.log('languages >>>', languages);
	// console.log('levels >>>', levels);

	const onChange = (e) => {
		setEvent({ ...event, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		createEvent({
			location,
			date,
			startTime,
			endTime,
			languages,
			levels,
		});
		console.log('Event will be created');
	};

	return (
		<Container>
			<div className='text-center'>
				<h3 className='mt-5 mb-3'>Create Event</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className='form-global-margin'>
						<Form.Group controlId='formBasicState'>
							<Form.Control
								type='text'
								placeholder='Locations*'
								defaultValue='Locations*'
								// value={location}
								onChange={onChange}
								name='location'
								as='select'
							>
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
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Control
								type='text'
								placeholder='Street*'
								onChange={onChange}
								name='street'
								// value={street}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicUnit'>
							<Form.Control
								type='text'
								placeholder='Unit'
								// value={unit}
								onChange={onChange}
								name='unit'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicCity'>
							<Form.Control
								type='text'
								placeholder='City*'
								// value={city}
								onChange={onChange}
								name='city'
							/>
						</Form.Group>

						{/* <Form.Group controlId='formBasicState'>
							<Form.Control
								type='text'
								placeholder='State*'
								defaultValue='State*'
								value={state}
								onChange={onChange}
								name='state'
								as='select'
							>
								{statesAndRegions.map((item) => {
									return <option value={item}>{item}</option>;
								})}
							</Form.Control>
						</Form.Group> */}
						<Form.Group controlId='formBasicZipCode'>
							<Form.Control
								type='text'
								placeholder='ZipCode*'
								// value={zipCode}
								onChange={onChange}
								name='zipCode'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicOnlinePlatform'>
							<Form.Control
								type='text'
								placeholder='Online Platform'
								// value={onlinePlatform}
								onChange={onChange}
								name='online platform'
							/>
						</Form.Group>

						<div className='text-center my-3'>
							<Button variant='warning' type='submit' size='lg'>
								Create Event
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateEvent;
