import React, { Fragment, useContext, useState, useEffect } from 'react'
import AlertContext from '../../../context/alert/alertContext'
import AuthContext from '../../../context/auth/authContext'
import { Form, Button, Row, Col } from 'react-bootstrap'

/**
 *
 * @param {*} props
 */
const ForgotPassword = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { forgotPassword, forgotRequestSuccess, error } = authContext
	const { setAlert } = alertContext

	const [user, setUser] = useState({
		email: '',
	})

	const { email } = user

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		forgotPassword({
			email,
		})
	}

	/**
	 *
	 */
	useEffect(() => {
		if (forgotRequestSuccess) {
			props.history.push('/login')
			setAlert(
				'Please check your email, if we found it in our database we will send you a reset link',
				'success'
			)
		}
	}, [error, forgotRequestSuccess, props.history, setAlert])

	return (
		<Fragment>
			<h2>Forgot Password</h2>
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
				<Button variant="primary" type="submit">
					Forgot Password
				</Button>
			</Form>
		</Fragment>
	)
}

export default ForgotPassword
