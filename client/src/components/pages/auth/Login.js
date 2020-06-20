import React, { Fragment, useContext, useState, useEffect } from 'react'
import Navbar from '../../Navbar'
import AuthContext from '../../../context/auth/authContext'
import AlertContext from '../../../context/alert/alertContext'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

const Login = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { setAlert } = alertContext
	const { login, error, clearErrors, isAuthenticated } = authContext

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { email, password } = user

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		login({
			email,
			password,
		})
	}

	return (
		<Fragment>
			<Navbar></Navbar>
			<Container>
				<Form onSubmit={onSubmit}>
					<Row>
						<Col>
							<Form.Group controlId="formEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									placeholder="E-Mail"
									name="email"
									value={email}
									onChange={onChange}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="formPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									name="password"
									value={password}
									onChange={onChange}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Button variant="primary" type="submit">
						Sign In
					</Button>
				</Form>
			</Container>
		</Fragment>
	)
}

export default Login
