import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

// import moduleName from 'module';
import './style.scss'
import logo from './ww-logo.svg'

import AuthContext from '../../context/auth/authContext'

const Index = () => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, logout } = authContext

	const authLinks = (
		<Fragment>
			<Link data-rb-event-key="/" className="nav-link" to="/">
				{' '}
				Home
			</Link>
			<Link data-rb-event-key="/events" className="nav-link" to="/">
				{' '}
				Events
			</Link>
			<ul class="navbar-nav">
				<li class="nav-item avatar">
					<a class="nav-link p-0" href="#">
						<img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg" class="rounded-circle z-depth-0"
							alt="avatar image" height="35"></img>
					</a>
				</li>
			</ul>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<Link data-rb-event-key="/login" className="nav-link" to="/login">
				Login
			</Link>
			<Link data-rb-event-key="/signup" className="nav-link" to="/signup">
				Signup
			</Link>
		</Fragment>
	)

	const onLogout = () => {
		logout()
	}

	return (
		<Navbar expand="lg">
			<Link className="navbar-brand" to="/">
				War{' '}
				<img
					alt="whiteboard warriors - war time"
					className="nav-logo"
					src={logo}
				></img>{' '}
				Time
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{isAuthenticated ? authLinks : guestLinks}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Index
