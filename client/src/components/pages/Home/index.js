import React, { Fragment, useContext, useState, useEffect } from 'react'
import Navbar from '../../Navbar'
import './style.scss'
import { Container } from 'react-bootstrap'
import AuthContext from '../../../context/auth/authContext'

const Home = () => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, user } = authContext

	const authGreeting = (
		<Fragment>
			Hi {user.firstName}! Thanks for joining Whiteboard Warriors!!! 👍
		</Fragment>
	)

	const landingGreeting = (
		<Fragment>
			Welcome to War-Time the Whiteboard Warriors Meet-Up App!
		</Fragment>
	)

	return (
		<Fragment>
			<Navbar></Navbar>
			<Container>
				<h1 className="mt-5">Welcome</h1>
				{isAuthenticated ? authGreeting : landingGreeting}
			</Container>
		</Fragment>
	)
}

export default Home
