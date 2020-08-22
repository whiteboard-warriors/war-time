import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../../context/auth/authContext'
import AlertContext from '../../../context/alert/alertContext'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

const Login = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { setAlert } = alertContext
	const { login, error, clearErrors, isAuthenticated } = authContext

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'Unauthorized') {
			setAlert(
				'Invalid username or password, please try again!',
				'danger'
			)
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
		<Container>
			<div className="text-center">
				<h3 className="mt-5 mb-3">Login</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className="login-form">
						<Row>
							<Col>
								<Form.Group controlId="formEmail">
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
									<Form.Control
										type="password"
										placeholder="Password"
										name="password"
										value={password}
										onChange={onChange}
										required
									/>
								</Form.Group>
								<a href="/forgot-password">Forgot Password?</a>
							</Col>
						</Row>
						<div className="text-center">
							<Button variant="secondary" type="submit" size="lg">
								Sign In
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default Login
