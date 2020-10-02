import React, { useContext, useRef, useEffect } from 'react';
import EventContext from '../../../../context/event/eventContext';

import { Form } from 'react-bootstrap';

const EventFilter = () => {
	const eventContext = useContext(EventContext);
	const text = useRef(' ');

	const { filterEvents, clearFilter, filtered } = eventContext;

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterEvents(e.target.value);
		} else {
			clearFilter();
		}
	};
	return (
		<Form>
			<Form.Group>
				<Form.Control
					ref={text}
					type='text'
					placeholder='Filter Events...'
					onChange={onChange}
				/>
			</Form.Group>
		</Form>
	);
};

export default EventFilter;
