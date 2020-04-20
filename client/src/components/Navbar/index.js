import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';

// import moduleName from 'module';
import './style.scss';

const Index = () => {
	return (
		<Navbar expand='lg'>
			<Link className='navbar-brand' to='/'>
				War Time
			</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Link data-rb-event-key='/' className='nav-link' to='/'>
						{' '}
						Home
					</Link>
					<Link
						data-rb-event-key='/landing'
						className='nav-link'
						to='/landing'
					>
						Landing
					</Link>
					<Link
						data-rb-event-key='/login'
						className='nav-link'
						to='/login'
					>
						Login
					</Link>
					<Link
						data-rb-event-key='/signup'
						className='nav-link'
						to='/signup'
					>
						Signup
					</Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		// <div>
		// 	<p>
		// 		<Link to='/'> -Home -</Link>
		// 		<Link to='/landing'>Landing -</Link>
		// 		<Link to='/login'>Login -</Link>
		// 		<Link to='/signup'>Signup -</Link>
		// 	</p>

		// </div>
	);
};

export default Index;

// import React, { Fragment, useContext } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';
// import ContactContext from '../../context/contact/contactContext';

// const Navbar = ({ title, icon }) => {
//     const authContext = useContext(AuthContext);
//     const contactContext = useContext(ContactContext);

//     const { isAuthenticated, logout, user } = authContext;
//     const { clearContacts } = contactContext;

//     const onLogout = () => {
//         logout();
//         clearContacts();
//     };

//     const authLinks = (
//         <Fragment>
//             <li className='ml-1'>
//                 <Link to='/'>Home</Link>
//             </li>
//             <li className='ml-1'>
//                 <Link to='/about'>About</Link>
//             </li>
//             <li li className='ml-1'>
//                 Hello, {user && user.name}!
//             </li>
//             <li className='ml-1'>
//                 <a onClick={onLogout} href='#1'>
//                     <i className='fas fa-sign-out-alt '></i>
//                     <span className='hide-sm'>Logout</span>
//                 </a>
//             </li>
//         </Fragment>
//     );

//     const guestLinks = (
//         <Fragment>
//             <li className='ml-1'>
//                 <Link to='/about'>About</Link>
//             </li>
//             <li li className='ml-1'>
//                 <Link to='/register'>Register</Link>
//             </li>
//             <li li className='ml-1'>
//                 <Link to='/login'>Login</Link>
//             </li>
//         </Fragment>
//     );

//     return (
//         <div className='navbar bg-primary'>
//             <h2>
//                 <i className={icon} />
//                 <Link to='/'>{title}</Link>
//             </h2>
//             <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
//         </div>
//     );
// };

// Navbar.protoTypes = {
//     title: PropTypes.string.isRequired,
//     icon: PropTypes.string
// };

// Navbar.defaultProps = {
//     title: 'Contact Keeper',
//     icon: 'fas fa-id-card-alt'
// };

// export default Navbar;
