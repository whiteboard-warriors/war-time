import React, { Fragment, useContext, useState, useEffect } from 'react';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import './style.scss';

const Signup = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

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
	});

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
	} = user;

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		register({
			firstName,
			lastName,
			email,
			slackUsername,
			primaryLanguage,
			secondaryLanguage,
			skillLevel,
			password,
		});
	};

	return (
		<Container>
			<div className='text-center'>
				<h3 className='mt-5 mb-3'>Signup</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className='signup-form'>
						<Row>
							<Col xs={12} sm={6}>
								<Form.Group controlId='formFirstname'>
									<Form.Control
										type='text'
										placeholder='First Name*'
										name='firstName'
										value={firstName}
										onChange={onChange}
										required
									/>
								</Form.Group>
							</Col>
							<Col xs={12} sm={6}>
								<Form.Group controlId='formLastname'>
									<Form.Control
										type='text'
										placeholder='Last Name*'
										name='lastName'
										value={lastName}
										onChange={onChange}
										required
									/>
								</Form.Group>
							</Col>
						</Row>
						<Form.Group controlId='formBasicEmail'>
							<Form.Control
								type='email'
								placeholder='Email*'
								name='email'
								value={email}
								onChange={onChange}
							/>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Control
								type='text'
								placeholder='Whiteboard Warriors Slack Username'
								onChange={onChange}
								name='slackUsername'
								value={slackUsername}
							/>
							<Form.Text className='text-muted'>
								We're using Slack to connect members for virtual
								meetups right now, You can join our Slack by{' '}
								<a href='https://join.slack.com/t/whiteboardwarriors/shared_invite/zt-bphxxiuf-Eeo0NOvjzaas2xMIgZ_Z7A'>
									clicking here
								</a>{' '}
								😉
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Control
								type='password'
								placeholder='Password*'
								value={password}
								onChange={onChange}
								name='password'
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPassword2'>
							<Form.Control
								type='password'
								placeholder='Confirm Password*'
								value={password2}
								onChange={onChange}
								name='password2'
							/>
						</Form.Group>

						<Row>
							<Col>
								<fieldset>
									<Form.Group>
										<Form.Label>
											Primary Language
										</Form.Label>
										<Col>
											<Form.Check
												type='radio'
												label='JavaScript'
												value='javascript'
												name='primaryLanguage'
												id='primarylanguageJavaScript'
												checked={
													primaryLanguage ===
													'javascript'
												}
												onChange={onChange}
												disabled={
													secondaryLanguage ===
													'javascript'
												}
											/>
											<Form.Check
												type='radio'
												label='C/C++/Java/Go'
												value='c-cplusplus-java-go'
												name='primaryLanguage'
												id='primarylanguageCJavaGo'
												checked={
													primaryLanguage ===
													'c-cplusplus-java-go'
												}
												onChange={onChange}
												disabled={
													secondaryLanguage ===
													'c-cplusplus-java-go'
												}
											/>
											<Form.Check
												type='radio'
												label='Python/Ruby'
												value='python-ruby'
												name='primaryLanguage'
												id='primarylanguagePythonRuby'
												checked={
													primaryLanguage ===
													'python-ruby'
												}
												onChange={onChange}
												disabled={
													secondaryLanguage ===
													'python-ruby'
												}
											/>
										</Col>
									</Form.Group>
								</fieldset>
							</Col>

							<Col>
								<fieldset>
									<Form.Group>
										<Form.Label>
											Secondary Language
										</Form.Label>

										<Col>
											<Form.Check
												type='radio'
												label='JavaScript'
												value='javascript'
												name='secondaryLanguage'
												id='secondarylanguageJavaScript'
												checked={
													secondaryLanguage ===
													'javascript'
												}
												onChange={onChange}
												disabled={
													primaryLanguage ===
													'javascript'
												}
											/>
											<Form.Check
												type='radio'
												label='C/C++/Java/Go'
												value='c-cplusplus-java-go'
												name='secondaryLanguage'
												id='secondarylanguageCJavaGo'
												checked={
													secondaryLanguage ===
													'c-cplusplus-java-go'
												}
												onChange={onChange}
												disabled={
													primaryLanguage ===
													'c-cplusplus-java-go'
												}
											/>
											<Form.Check
												type='radio'
												label='Python/Ruby'
												name='secondaryLanguage'
												value='python-ruby'
												id='secondarylanguagePythonRuby'
												checked={
													secondaryLanguage ===
													'python-ruby'
												}
												onChange={onChange}
												disabled={
													primaryLanguage ===
													'python-ruby'
												}
											/>
										</Col>
									</Form.Group>
								</fieldset>
							</Col>
						</Row>

						<Row>
							<Col>
								<fieldset>
									<Form.Group>
										<Form.Label>Skill Level</Form.Label>
										<Col onChange={onChange}>
											<Form.Check
												type='radio'
												label='Beginner (Less than 1-year coding) '
												name='skillLevel'
												id='skillLevelAdvanced'
												value='beginner'
											/>
											<Form.Check
												type='radio'
												label='Easy (1-2 Years Coding)'
												name='skillLevel'
												id='skillLevelEasy'
												value='easy'
											/>
											<Form.Check
												type='radio'
												label='Medium (2-5 years coding)'
												name='skillLevel'
												id='skillLevelMedium'
												value='medium'
											/>
											<Form.Check
												type='radio'
												label='Hard (5+ years)'
												name='skillLevel'
												id='skillLevelHard'
												value='hard'
											/>
										</Col>
									</Form.Group>
								</fieldset>
							</Col>
						</Row>
						<div className='text-center my-3'>
							<Button variant='warning' type='submit' size='lg'>
								Sign-Up!
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Signup;
