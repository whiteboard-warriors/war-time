import React from 'react';

import Navbar from '../../Navbar';

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
			<Navbar></Navbar>
			<h1>Landing Page</h1>
		</div>
	);
};

export default Landing;
