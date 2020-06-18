// import React, { Fragment } from 'react';

import Navbar from '../../Navbar'

// const Signup = () => {
// 	return (
// 		<Fragment>
// 			<Navbar></Navbar>
// 			<h1 className='mt-5'>Signup</h1>
// 		</Fragment>
// 	);
// };

// export default Signup;

import React, { Fragment, useContext, useState, useEffect } from 'react'
import AlertContext from '../../../context/alert/alertContext'
import AuthContext from '../../../context/auth/authContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

const Signup = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { setAlert } = alertContext
	const { register, error, clearErrors, isAuthenticated } = authContext

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'User already exists') {
			// setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = user

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (name === '' || email === '' || password === '') {
			// setAlert('Please enter all fields', 'danger')
		} else if (password !== password2) {
			// setAlert('Passwords do no match', 'danger')
		} else {
			register({
				name,
				email,
				password,
			})
		}
	}

	return (
		<Fragment>
			<Navbar></Navbar>
			<Container>
				{/* <div className="form-container">
				<h1>
					Account <span className="text-primary">Register</span>
				</h1> */}
				<Form>
					<Row>
						<Col>
							<Form.Group controlId="formFirstname">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="What is your preferred name?"
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="formLastname">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="What is your family/last name?"
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Slack Username</Form.Label>
						<Form.Control
							type="slack"
							placeholder="Your Whiteboard Warriors Slack user"
						/>
						<Form.Text className="text-muted">
							We're using Slack to connect members for virtual
							meetups right now, You can join our Slack by{' '}
							<a href="https://join.slack.com/t/whiteboardwarriors/shared_invite/zt-bphxxiuf-Eeo0NOvjzaas2xMIgZ_Z7A">
								clicking here
							</a>{' '}
							😉
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Row>
						<Col>
							<fieldset>
								<Form.Group as={Row}>
									<Form.Label as="legend" column sm={2}>
										Primary Language
									</Form.Label>
									<Col sm={10}>
										<Form.Check
											type="radio"
											label="JavaScript"
											name="formHorizontalRadios"
											id="languageJavaScript"
										/>
										<Form.Check
											type="radio"
											label="C/C++/Java/Go"
											name="formHorizontalRadios"
											id="languageCJavaGo"
										/>
										<Form.Check
											type="radio"
											label="Python/Ruby"
											name="formHorizontalRadios"
											id="languagePythonRuby"
										/>
									</Col>
								</Form.Group>
							</fieldset>
						</Col>

						<Col>
							<fieldset>
								<Form.Group as={Row}>
									<Form.Label as="legend" column sm={2}>
										Secondary Language
									</Form.Label>
									<Col sm={10}>
										<Form.Check
											type="radio"
											label="JavaScript"
											name="formHorizontalRadios"
											id="languageJavaScript"
										/>
										<Form.Check
											type="radio"
											label="C/C++/Java/Go"
											name="formHorizontalRadios"
											id="languageCJavaGo"
										/>
										<Form.Check
											type="radio"
											label="Python/Ruby"
											name="formHorizontalRadios"
											id="languagePythonRuby"
										/>
									</Col>
								</Form.Group>
							</fieldset>
						</Col>
					</Row>

					<Button variant="primary" type="submit">
						Sign-Up!
					</Button>
				</Form>
			</Container>
			{/* <form onSubmit={onSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={onChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={onChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={onChange}
							required
							minLength="6"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password2">Confirm Password</label>
						<input
							type="password"
							name="password2"
							value={password2}
							onChange={onChange}
							required
							minLength="6"
						/>
					</div>
					<input
						type="submit"
						value="Register"
						className="btn btn-primary btn-block"
					/>
				</form> */}
			{/* </div> */}
		</Fragment>
	)
}

export default Signup
