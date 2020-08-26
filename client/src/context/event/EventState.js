import React, { useReducer } from 'react';
import axios from 'axios';
import EventContext from './eventContext';
import eventReducer from './eventReducer';
import {
	GET_EVENTS,
	ADD_EVENT,
	DELETE_EVENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_EVENT,
	FILTER_EVENTS,
	CLEAR_EVENTS,
	CLEAR_FILTER,
	EVENT_ERROR,
} from '../types';

const EventState = (props) => {
	const initialState = {
		events: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(eventReducer, initialState);

	// Get Events
	const getEvents = async () => {
		try {
			const res = await axios.get('/api/events');

			dispatch({
				type: GET_EVENTS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: EVENT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	// Create Event
	const createEvent = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/events', event, config);

			dispatch({
				type: ADD_EVENT,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: EVENT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	// Delete Event
	const deleteEvent = async (id) => {
		try {
			await axios.delete(`/api/events/${id}`);

			dispatch({
				type: DELETE_EVENT,
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: EVENT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	// Update Event
	const updateEvent = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/event/${event._id}`,
				event,
				config
			);

			dispatch({
				type: UPDATE_EVENT,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: EVENT_ERROR,
				payload: err.response.msg,
			});
		}
	};

	//Clear Events
	const clearEvents = () => {
		dispatch({ type: CLEAR_EVENTS });
	};

	// Set Current Event
	const setCurrent = (potluck) => {
		dispatch({ type: SET_CURRENT, payload: potluck });
	};

	// Clear Current Event
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Events
	const filterEvents = (text) => {
		dispatch({ type: FILTER_EVENTS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<EventContext.Provider
			value={{
				events: state.events,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				createEvent,
				deleteEvent,
				clearEvents,
				setCurrent,
				clearCurrent,
				updateEvent,
				filterEvents,
				clearFilter,
				getEvents,
			}}
		>
			{props.children}
		</EventContext.Provider>
	);
};

export default EventState;
