import React, { Fragment } from 'react';

import Navbar from '../../Navbar';
import EventCard from '../../EventCard';

import './style.scss';

// import AuthContext from '../../../context/auth/authContext';

const Home = () => {
	// const authContext = useContext(AuthContext);

	// useEffect(() => {
	// 	authContext.loadUser();
	// 	// eslint-disable-next-line
	// }, []);

	return (
		<Fragment>
			<Navbar></Navbar>
			<h1 className='mt-5'>Home Page</h1>
			<EventCard></EventCard>
		</Fragment>
	);
};

export default Home;
