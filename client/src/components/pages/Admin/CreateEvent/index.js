import React, { useContext, useState, useEffect } from 'react'
import AlertContext from '../../../../context/alert/alertContext'
import AuthContext from '../../../../context/auth/authContext'
// import LocationContext from '../../../../context/location/locationContext'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import EventContext from '../../../../context/event/eventContext'
import './style.scss'
/**
 *
 * @param {*} props
 */
const CreateEvent = (props) => {
	const alertContext = useContext(AlertContext)
	const eventContext = useContext(EventContext)
	const authContext = useContext(AuthContext)

	const { setAlert } = alertContext
	const { isAuthenticated } = authContext
	const {
		createEvent,
		clearCreateEventFlags,
		error,
		saveSuccess,
	} = eventContext

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/admin/create-event')
		}

		if (!isAuthenticated) {
			setAlert('Please login before completing action.', 'danger')
			props.history.push('/login')
		}

		if (error === 'You are not authorized to create events.') {
			setAlert(error, 'danger')
		}

		if (error != null && error.indexOf('title_1 dup key') !== -1) {
			setAlert('Event name is not unique, please try again!', 'danger')
		}

		if (saveSuccess) {
			setAlert('Event has been created.', 'success')
			clearCreateEventFlags()
			debugger
			props.history.push('/admin')
		}
	}, [
		error,
		saveSuccess,
		isAuthenticated,
		clearCreateEventFlags,
		props.history,
	])

	const [event, setEvent] = useState({
		title: '',
		dateTime: '',
	})

	const { title, dateTime } = event

	const onChange = (e) => {
		setEvent({ ...event, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		createEvent({
			title,
			dateTime,
		})
		console.log('Event will be created')
	}

	return (
		<Container>
			<div className="text-center">
				<h3 className="mt-5 mb-3">Create Event</h3>
			</div>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<Form onSubmit={onSubmit} className="form-global-margin">
						<Form.Group controlId="formBasicState">
							<Form.Control
								type="text"
								placeholder="Title"
								defaultValue=""
								value={title}
								onChange={onChange}
								name="title"
							></Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Control
								type="datetime-local"
								placeholder="Start Time"
								value={dateTime}
								onChange={onChange}
								name="dateTime"
							></Form.Control>
						</Form.Group>

						<div className="text-center my-3">
							<Button variant="warning" type="submit" size="lg">
								Create Event
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default CreateEvent
