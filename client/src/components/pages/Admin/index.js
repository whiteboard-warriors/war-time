import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Container, Button, Form } from 'react-bootstrap';

import EventCard from '../../EventCard';

import './style.scss';
//images
import wwLogo from './ww-logo.svg';

import AuthContext from '../../../context/auth/authContext';
//temp data
import events from '../../../0-temp-data/events';
import languages from '../../../0-temp-data/languages';
import locations from '../../../0-temp-data/locations';

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
									locations.map((location) => {
										return (
											<div className='location-card'>
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
										languages.map((item) => {
											return (
												<div className='language-card'>
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
						{isAuthenticated &&
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
					</div>
				</div>
			</Container>
		</Fragment>
	);
};

export default Admin;
