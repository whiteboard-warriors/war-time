import React, { Fragment, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';
import EventContext from '../../../context/event/eventContext';
import './style.scss';

/**
 *
 */
const Events = (props) => {
	const alertContext = useContext(AlertContext);
	const eventContext = useContext(EventContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { isAuthenticated } = authContext;
	const { getEvents, events } = eventContext;

	useEffect(() => {
		if (!isAuthenticated) {
			setAlert('Please login before completing action.', 'danger');
			props.history.push('/login');
		}

		getEvents();
	}, [getEvents, props, setAlert, isAuthenticated]);

	return (
		<Fragment>
			<Container>
				<h2>Events</h2>
				{events &&
					events.map((event, index) => {
						return (
							<div key={index}>
								<a href={'event/' + event.slug}>
									{event.title}
								</a>
							</div>
						);
					})}
			</Container>
		</Fragment>
	);
};

export default Events;
