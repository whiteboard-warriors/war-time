import React, { Fragment } from 'react';

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
		<Fragment>
			<Navbar></Navbar>
			<h1 className='mt-5'>Landing Page</h1>
		</Fragment>
	);
};

export default Landing;
