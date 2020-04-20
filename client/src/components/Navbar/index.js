import React from 'react';
// import { Link } from 'react-router-dom';

import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from 'react-bootstrap';

// import moduleName from 'module';
import './style.scss';

const NavBar = () => {
	return (
		<NavDropdown.Item bg='light' expand='lg'>
			<Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link href='#home'>Home</Nav.Link>
					<Nav.Link href='#link'>Link</Nav.Link>
					<NavDropdown title='Dropdown' id='basic-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>
							Action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>
							Something
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl
						type='text'
						placeholder='Search'
						className='mr-sm-2'
					/>
					<Button variant='outline-success'>Search</Button>
				</Form>
			</Navbar.Collapse>
		</NavDropdown.Item>
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

export default NavBar;

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
