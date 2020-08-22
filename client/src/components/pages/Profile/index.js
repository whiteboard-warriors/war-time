import React, { Fragment, useContext, useState, useEffect } from 'react';
import './style.scss';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

const Profile = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { user, updateUserProfile, updateProfileSuccess } = authContext;

	const [profile, setProfile] = useState({
		id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		slackUsername: user.slackUsername,
		primaryLanguage: user.primaryLanguage,
		secondaryLanguage: user.secondaryLanguage,
		skillLevel: user.skillLevel,
	});

	const {
		id,
		firstName,
		lastName,
		slackUsername,
		primaryLanguage,
		secondaryLanguage,
		skillLevel,
	} = profile;

	/**
	 *
	 */
	useEffect(() => {
		if (updateProfileSuccess) {
			setAlert('Your profile has been updated.', 'success');
		}
	}, [updateProfileSuccess, setAlert]);

	const onChangeProfile = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	const saveProfile = (e) => {
		e.preventDefault();
		updateUserProfile({
			id,
			firstName,
			lastName,
			slackUsername,
			primaryLanguage,
			secondaryLanguage,
			skillLevel,
		});
	};

	return (
		<Fragment>
			<Container className='mb-5'>
				<div className='text-center mb-5'>
					<h1 className='mt-5'>
						{user.firstName} {user.lastName}
					</h1>
				</div>
				<Row>
					<Col lg={{ span: 6, offset: 3 }}>
						<Form
							onSubmit={saveProfile}
							// className='form-custom-margin'
						>
							<Row>
								<Col xs={12} sm={6}>
									<Form.Group controlId='formFirstname'>
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='What is your preferred name?'
											name='firstName'
											value={firstName}
											onChange={onChangeProfile}
											required
										/>
									</Form.Group>
								</Col>
								<Col xs={12} sm={6}>
									<Form.Group controlId='formLastname'>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type='text'
											placeholder='What is your family/last name?'
											name='lastName'
											value={lastName}
											onChange={onChangeProfile}
											required
										/>
									</Form.Group>
								</Col>
							</Row>
							<Form.Group controlId='formBasicPassword'>
								<Form.Label>Slack Username</Form.Label>
								<Form.Control
									type='text'
									placeholder='Your Whiteboard Warriors Slack user'
									onChange={onChangeProfile}
									name='slackUsername'
									value={slackUsername}
								/>
							</Form.Group>
							<Row className='mt-5'>
								<Col>
									<fieldset>
										<Form.Group>
											<Form.Label>
												Primary Language
											</Form.Label>
											<Col
												sm={10}
												onChange={onChangeProfile}
											>
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
													onChange={onChangeProfile}
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
													onChange={onChangeProfile}
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
													onChange={onChangeProfile}
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
											<Col sm={10}>
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
													onChange={onChangeProfile}
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
													onChange={onChangeProfile}
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
													onChange={onChangeProfile}
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
											<Col
												sm={10}
												onChange={onChangeProfile}
											>
												<Form.Check
													type='radio'
													label='Beginner (Less than 1-year coding) '
													name='skillLevel'
													id='skillLevelAdvanced'
													value='beginner'
													checked={
														skillLevel ===
														'beginner'
													}
												/>
												<Form.Check
													type='radio'
													label='Easy (1-2 Years Coding)'
													name='skillLevel'
													id='skillLevelEasy'
													value='easy'
													checked={
														skillLevel === 'easy'
													}
												/>
												<Form.Check
													type='radio'
													label='Medium (2-5 years coding)'
													name='skillLevel'
													id='skillLevelMedium'
													value='medium'
													checked={
														skillLevel === 'medium'
													}
												/>
												<Form.Check
													type='radio'
													label='Hard (5+ years)'
													name='skillLevel'
													id='skillLevelHard'
													value='hard'
													checked={
														skillLevel === 'hard'
													}
												/>
											</Col>
										</Form.Group>
									</fieldset>
								</Col>
							</Row>

							<Button variant='primary' type='submit'>
								Save
							</Button>
						</Form>

						<hr />
						<h4 className='my-4'>Change Password</h4>
						<Form className='form-custom-margin'>
							<Form.Group controlId='formGroupEmail'>
								<Form.Control
									type='password'
									placeholder='Password'
									id='password'
								/>

								<Form.Control
									type='password'
									placeholder='Confirm Password'
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Reset
							</Button>
						</Form>
						<hr className='my-4' />
						<h4>Change E-Mail</h4>
						<Form className='form-custom-margin'>
							<Form.Group controlId='formGroupEmail'>
								<Form.Control
									type='email'
									placeholder='Enter email'
								/>
							</Form.Group>
							<Button variant='primary' type='submit'>
								Update
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Profile;
