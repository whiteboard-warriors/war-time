import React, { Fragment, useContext, useState, useEffect } from 'react'
import AlertContext from '../../../context/alert/alertContext'
import AuthContext from '../../../context/auth/authContext'
import { Form, Button, Row, Col } from 'react-bootstrap'
import qs from 'qs'
import setAuthToken from '../../../utils/setAuthToken'

const ResetPassword = (props) => {
	const alertContext = useContext(AlertContext)
	const authContext = useContext(AuthContext)

	const { forgotPasswordComplete, forgotResetSuccess, error } = authContext
	const { setAlert } = alertContext

	const [user, setUser] = useState({
		password: '',
		passwordConfirm: '',
		token: '',
	})

	const { password, passwordConfirm, token } = user

	useEffect(() => {
		let token = qs.parse(props.location.search, {
			ignoreQueryPrefix: true,
		}).token
		setUser({
			...user,
			token: token,
		})

		if (error === 'INVALID_TOKEN') {
			setAlert(
				'The was an error resetting your password, please try again, or request another reset.',
				'danger'
			)
		}

		if (forgotResetSuccess) {
			setAlert(
				'Your password has been reset, you can now use it to login.',
				'success'
			)
			props.history.push('/login')
		}
	}, [error, forgotResetSuccess, props.history])

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		forgotPasswordComplete({
			password,
			token,
		})
	}

	return (
		<Fragment>
			<h2>Reset Password</h2>
			<Form onSubmit={onSubmit}>
				<Row>
					<Col>
						<Form.Group controlId="formEmail">
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
					<Col>
						<Form.Group controlId="formEmail">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm Password"
								name="passwordConfirm"
								value={passwordConfirm}
								onChange={onChange}
								required
							/>
						</Form.Group>
					</Col>
				</Row>
				<Button variant="primary" type="submit">
					Set Password
				</Button>
			</Form>
		</Fragment>
	)
}

export default ResetPassword
