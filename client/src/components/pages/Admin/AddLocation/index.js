import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import statesAndRegions from './statesAndRegions';

import './style.scss';

const AddLocation = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/admin/add-location');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [location, setLocation] = useState({
		name: '',
		street: '',
		unit: '',
		city: '',
		state: '',
		zipCode: '',
		onlinePlatform: '',
	});

	const {
		name,
		street,
		unit,
		city,
		state,
		zipCode,
		onlinePlatform,
	} = location;

	const onChange = (e) => {
		setLocation({ ...location, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		// createEvent({
		// 	name,
		//	street,
		// 	unit,
		//	city,
		// 	state,
		//	zipCode,
		//	onlinePlatform

		// })
		console.log('Event will be created');
	};

	return (
		<Container>
			<div className='text-center'>
				<h3 className='mt-5 mb-3'>Add Location</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className='form-custom-margin'>
						<Form.Group controlId='formBasicName'>
							<Form.Control
								type='text'
								placeholder='Name*'
								name='name'
								value={name}
								onChange={onChange}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Control
								type='text'
								placeholder='Street*'
								onChange={onChange}
								name='street'
								value={street}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicUnit'>
							<Form.Control
								type='text'
								placeholder='Unit'
								value={unit}
								onChange={onChange}
								name='unit'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicCity'>
							<Form.Control
								type='text'
								placeholder='City*'
								value={city}
								onChange={onChange}
								name='city'
							/>
						</Form.Group>

						<Form.Group controlId='formBasicState'>
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
						</Form.Group>
						<Form.Group controlId='formBasicZipCode'>
							<Form.Control
								type='text'
								placeholder='ZipCode*'
								value={zipCode}
								onChange={onChange}
								name='zipCode'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicOnlinePlatform'>
							<Form.Control
								type='text'
								placeholder='Online Platform'
								value={onlinePlatform}
								onChange={onChange}
								name='online platform'
							/>
						</Form.Group>

						<div className='text-center my-3'>
							<Button variant='warning' type='submit' size='lg'>
								Add Location
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default AddLocation;
