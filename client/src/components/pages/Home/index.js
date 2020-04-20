import React from 'react';

import NavBar from '../../NavBar';

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
			<NavBar></NavBar>
			<h1>Home Page</h1>
		</div>
	);
};

export default Home;
