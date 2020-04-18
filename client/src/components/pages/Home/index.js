import React, { Fragment, useContext, useEffect } from 'react';

import Navbar from '../../Navbar';

import './style.scss';

// import AuthContext from '../../../context/auth/authContext';

const Home = () => {
	// const authContext = useContext(AuthContext);

	// useEffect(() => {
	// 	authContext.loadUser();
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<div className='m-auto'>
			<Navbar></Navbar>
			<h1>Home Page</h1>
		</div>
	);
};

export default Home;
