import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// import moduleName from 'module';
import './style.scss';
import logo from './ww-logo.svg';
import AuthContext from '../../context/auth/authContext';

const Index = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout, user } = authContext;

	const authLinks = (
		<Fragment>
			<Link data-rb-event-key='/' className='nav-link' to='/'>
				{' '}
				Home
			</Link>
			<Link data-rb-event-key='/events' className='nav-link' to='/events'>
				{' '}
				Events
			</Link>
			{isAuthenticated && (
				<NavDropdown
					title={user.firstName ? user.firstName : ''}
					id='collasible-nav-dropdown'
				>
					<Link
						data-rb-event-key='/profile'
						className='dropdown-item'
						to='/profile'
					>
						Profile
					</Link>
					<NavDropdown.Item href='#logout' onClick={logout}>
						Log Out
					</NavDropdown.Item>
				</NavDropdown>
			)}

			<ul className='navbar-nav'>
				<li className='nav-item avatar'>
					<a className='nav-link p-0' href='/profile'>
						<img
							src='https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg'
							className='profile-pic rounded-circle z-depth-0'
							alt='avatar'
						></img>
					</a>
				</li>
			</ul>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link data-rb-event-key='/login' className='nav-link' to='/login'>
				Login
			</Link>
			<Link data-rb-event-key='/signup' className='nav-link' to='/signup'>
				Signup
			</Link>
		</Fragment>
	);

	return (
		<Navbar expand='lg'>
			<Link className='navbar-brand' to='/'>
				War{' '}
				<img
					alt='whiteboard warriors - war time'
					className='nav-logo'
					src={logo}
				></img>{' '}
				Time
			</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					{isAuthenticated ? authLinks : guestLinks}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Index;
