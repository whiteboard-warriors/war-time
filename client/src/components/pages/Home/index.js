import React, { Fragment, useContext } from 'react'
import './style.scss'
import { Jumbotron, Button } from 'react-bootstrap'
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
			<Jumbotron>
				<h1>Welcome!</h1>
				<p>{isAuthenticated ? authGreeting : landingGreeting}</p>
				<p>
					<Button variant="primary">Events</Button>
				</p>
			</Jumbotron>
		</Fragment>
	)
}

export default Home
