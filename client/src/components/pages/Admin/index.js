import React, { Fragment, useContext } from 'react';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import EventCard from '../../EventCard';

import './style.scss';
//images
import wwLogo from './ww-logo.svg';
import pen from './pen.svg';
import trashCan from './delete.svg';

import events from '../../../0-temp-data/events';

import AuthContext from '../../../context/auth/authContext';

const Admin = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

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
			<Container className='mt-5 admin-page-container text-center'>
				<div className='mt-5 admin-action-container'>
					<div>
						<h3 className='my-4'>Admin</h3>
						<div className='admin-action-card text-center'>
							<div className='admin-create-buttons'>
								<Button variant='warning'>Create Event</Button>
								<Button variant='warning'>Add Location</Button>
								<Button variant='warning'>Add Language</Button>
							</div>
						</div>
					</div>
					<div>
						<h3 className='my-4'>Locations</h3>
						<div className='admin-action-card text-center'>
							<Form className='admin-search-form'>
								<Form.Group controlId='formBasicPassword'>
									<Form.Control
										type='password'
										placeholder='Password'
									/>
								</Form.Group>

								<Button variant='primary' type='submit'>
									<i class='fa fa-search'></i>
								</Button>
							</Form>
							<div className='location-card-container'>
								<div className='location-card'>
									<p>Location Name</p>
									<div>
										<a href=''>
											<i class='fa fa-pen'></i>
										</a>

										<a href=''>
											<i class='fa fa-trash'></i>
										</a>
									</div>
								</div>
								<div className='location-card'>
									<p>Location Name</p>
									<div>
										<a href=''>
											<i class='fa fa-pen'></i>
										</a>

										<a href=''>
											<i class='fa fa-trash'></i>
										</a>
									</div>
								</div>
								<div className='location-card'>
									<p>Location Name</p>
									<div>
										<a href=''>
											<i class='fa fa-pen'></i>
										</a>

										<a href=''>
											<i class='fa fa-trash'></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 className='my-4'>Languages</h3>
						<div className='admin-action-card text-center'>
							<div className='language-card-container'>
								<div className='language-card'>
									language card
								</div>
								<div className='language-card'>
									language card
								</div>
								<div className='language-card'>
									language card
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
						{events.map((item) => {
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
					</div>
				</div>
			</Container>
		</Fragment>
	);
};

export default Admin;
