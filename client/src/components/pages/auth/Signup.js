import React, { Fragment, useContext, useState, useEffect } from 'react'
import AlertContext from '../../../context/alert/alertContext'
import AuthContext from '../../../context/auth/authContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Navbar from '../../Navbar'

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
		firstName: '',
		lastName: '',
		email: '',
		slackUsername: '',
		primaryLanguage: '',
		secondaryLanguage: '',
		skillLevel: '',
		password: '',
		password2: '',
	})

	const {
		firstName,
		lastName,
		email,
		slackUsername,
		primaryLanguage,
		secondaryLanguage,
		skillLevel,
		password,
		password2,
	} = user

	const onChange = (e) => {
		console.info(e.target.name + ' ' + e.target.value)
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		register({
			firstName,
			lastName,
			email,
			slackUsername,
			primaryLanguage,
			secondaryLanguage,
			skillLevel,
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
							<Form.Group controlId="formFirstname">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="What is your preferred name?"
									name="firstName"
									value={firstName}
									onChange={onChange}
									required
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="formLastname">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="What is your family/last name?"
									name="lastName"
									value={lastName}
									onChange={onChange}
									required
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={email}
							onChange={onChange}
						/>
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Slack Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Your Whiteboard Warriors Slack user"
							onChange={onChange}
							name="slackUsername"
							value={slackUsername}
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
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={onChange}
							name="password"
						/>
					</Form.Group>

					<Row>
						<Col>
							<fieldset>
								<Form.Group as={Row}>
									<Form.Label as="legend" column sm={2}>
										Primary Language
									</Form.Label>
									<Col sm={10} onChange={onChange}>
										<Form.Check
											type="radio"
											label="JavaScript"
											value="javascript"
											name="primaryLanguage"
											id="primarylanguageJavaScript"
										/>
										<Form.Check
											type="radio"
											label="C/C++/Java/Go"
											value="c-cplusplus-java-go"
											name="primaryLanguage"
											id="primarylanguageCJavaGo"
										/>
										<Form.Check
											type="radio"
											label="Python/Ruby"
											value="python-ruby"
											name="primaryLanguage"
											id="primarylanguagePythonRuby"
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
									<Col sm={10} onChange={onChange}>
										<Form.Check
											type="radio"
											label="JavaScript"
											value="javascript"
											name="secondaryLanguage"
											id="secondarylanguageJavaScript"
										/>
										<Form.Check
											type="radio"
											label="C/C++/Java/Go"
											value="c-cplusplus-java-go"
											name="secondaryLanguage"
											id="secondarylanguageCJavaGo"
										/>
										<Form.Check
											type="radio"
											label="Python/Ruby"
											name="secondaryLanguage"
											value="python-ruby"
											id="secondarylanguagePythonRuby"
										/>
									</Col>
								</Form.Group>
							</fieldset>
						</Col>
					</Row>

					<Row>
						<Col>
							<fieldset>
								<Form.Group as={Row}>
									<Form.Label as="legend" column sm={2}>
										Skill Level
									</Form.Label>
									<Col sm={10} onChange={onChange}>
										<Form.Check
											type="radio"
											label="Beginner (Less than 1-year coding) "
											name="skillLevel"
											id="skillLevelAdvanced"
											value="beginner"
										/>
										<Form.Check
											type="radio"
											label="Easy (1-2 Years Coding)"
											name="skillLevel"
											id="skillLevelEasy"
											value="easy"
										/>
										<Form.Check
											type="radio"
											label="Medium (2-5 years coding)"
											name="skillLevel"
											id="skillLevelMedium"
											value="medium"
										/>
										<Form.Check
											type="radio"
											label="Hard (5+ years)"
											name="skillLevel"
											id="skillLevelHard"
											value="hard"
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
