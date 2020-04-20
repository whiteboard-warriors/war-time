import React, { Fragment } from 'react';

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
		<Fragment>
			<Navbar></Navbar>
			<h1 className='mt-5'>Home Page</h1>
		</Fragment>
	);
};

export default Home;
