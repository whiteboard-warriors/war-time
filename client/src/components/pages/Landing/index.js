import React from 'react';

import NavBar from '../../NavBar';

import './style.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// 	faUtensils,
// 	faCalendarAlt,
// 	faHotdog,
// 	faUsers,
// } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
	return (
		<div className='m-auto'>
			<NavBar></NavBar>
			<h1>Landing Page</h1>
		</div>
	);
};

export default Landing;
