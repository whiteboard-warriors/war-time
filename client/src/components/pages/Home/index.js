import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';

import Navbar from '../../Navbar';
import EventCard from '../../EventCard';

import './style.scss';
import wwLogo from './ww-logo.svg';

import events from '../../../0-temp-data/events';

// import AuthContext from '../../../context/auth/authContext';

const Home = () => {
	// const authContext = useContext(AuthContext);

	// useEffect(() => {
	// 	authContext.loadUser();
	// 	// eslint-disable-next-line
	// }, []);

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
			<Navbar></Navbar>
			<Container className='mt-5 card-container'>
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
			</Container>
		</Fragment>
	);
};

export default Home;
