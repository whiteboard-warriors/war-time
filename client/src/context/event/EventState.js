import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import EventContext from './eventContext'
import eventReducer from './eventReducer'
import * as HTTP from '../../service/HTTP'
import AlertContext from '../../context/alert/alertContext'
import {
	GET_EVENTS,
	CREATE_EVENT,
	CREATE_EVENT_SUCCESS,
	DELETE_EVENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_EVENT,
	FILTER_EVENTS,
	CLEAR_EVENTS,
	CLEAR_FILTER,
	CREATE_EVENT_ERROR,
	GET_EVENTS_ERROR,
	DELETE_EVENT_ERROR,
	UPDATE_EVENT_ERROR,
	CLEAR_CREATE_EVENT_FLAGS,
} from '../types'

const EventState = (props) => {
	const initialState = {
		events: null,
		current: null,
		filtered: null,
		error: null,
		saving: false,
		saveSuccess: false,
	}
	const alertContext = useContext(AlertContext)
	const [state, dispatch] = useReducer(eventReducer, initialState)

	// Get Events
	const getEvents = async () => {
		try {
			const res = await axios.get('/api/events')

			dispatch({
				type: GET_EVENTS,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: GET_EVENTS_ERROR,
				payload: err.response.msg,
			})
		}
	}

	// Add Event
	const createEvent = async (event) => {
		dispatch({
			type: CREATE_EVENT,
			payload: null,
		})
		try {
			let result = await HTTP.post('/api/events', event)
		} catch (err) {
			dispatch({
				type: CREATE_EVENT_ERROR,
				payload: err.response.data.msg,
			})
		}
	}

	const clearCreateEventFlags = async () => {
		dispatch({
			type: CLEAR_CREATE_EVENT_FLAGS,
		})
	}

	// Delete Event
	const deleteEvent = async (id) => {
		try {
			await axios.delete(`/api/events/${id}`)

			dispatch({
				type: DELETE_EVENT,
				payload: id,
			})
		} catch (err) {
			dispatch({
				type: DELETE_EVENT_ERROR,
				payload: err.response.msg,
			})
		}
	}

	// Update Event
	const updateEvent = async (event) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		try {
			const res = await axios.put(
				`/api/event/${event._id}`,
				event,
				config
			)

			dispatch({
				type: UPDATE_EVENT,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: UPDATE_EVENT_ERROR,
				payload: err.response.msg,
			})
		}
	}

	//Clear Events
	const clearEvents = () => {
		dispatch({ type: CLEAR_EVENTS })
	}

	// Set Current Event
	const setCurrent = (potluck) => {
		dispatch({ type: SET_CURRENT, payload: potluck })
	}

	// Clear Current Event
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT })
	}

	// Filter Events
	const filterEvents = (text) => {
		dispatch({ type: FILTER_EVENTS, payload: text })
	}

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER })
	}

	return (
		<EventContext.Provider
			value={{
				events: state.events,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				saving: state.saving,
				saveSuccess: state.saveSuccess,
				createEvent,
				deleteEvent,
				clearEvents,
				setCurrent,
				clearCurrent,
				updateEvent,
				filterEvents,
				clearFilter,
				getEvents,
				clearCreateEventFlags,
			}}
		>
			{props.children}
		</EventContext.Provider>
	)
}

export default EventState
