import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../../../context/alert/alertContext';
import AuthContext from '../../../../context/auth/authContext';
import LanguageContext from '../../../../context/language/languageContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import './style.scss';

const AddLanguage = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const languageContext = useContext(LanguageContext);

	const { setAlert } = alertContext;
	const { error, clearErrors, isAuthenticated } = authContext;
	const { addLanguage } = languageContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/admin/add-language');
		}

		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [languages, setLanguage] = useState({
		language: '',
	});
	const { language } = languages;

	const onChange = (e) => {
		setLanguage({ ...language, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('language = ', language);
		addLanguage({
			language: language,
		});
		props.history.push('/admin');
		setAlert('New language added!', 'primary');
	};

	return (
		<Container>
			<div className='text-center'>
				<h3 className='mt-5 mb-3'>Add Language</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className='form-custom-margin'>
						<Form.Group controlId='formBasicLanguage'>
							<Form.Control
								type='text'
								placeholder='Langauge'
								value={language}
								onChange={onChange}
								name='language'
							/>
						</Form.Group>

						<div className='text-center my-3'>
							<Button variant='warning' type='submit' size='lg'>
								Add Language
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default AddLanguage;
