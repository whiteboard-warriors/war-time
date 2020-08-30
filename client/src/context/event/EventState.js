import React, { useContext, useReducer } from 'react'
import axios from 'axios'
import EventContext from './eventContext'
import eventReducer from './eventReducer'
import * as HTTP from '../../service/HTTP'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import {
	GET_EVENTS_SUCCESS,
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
	LOAD_EVENT,
	LOAD_EVENT_SUCCESS,
	LOAD_EVENT_ERROR,
} from '../types'
import { ConnectionStates } from 'mongoose'

const EventState = (props) => {
	const initialState = {
		events: null,
		current: null,
		filtered: null,
		error: null,
		saving: false,
		saveSuccess: false,
		event: null,
	}

	const authContext = useContext(AuthContext)
	const { authError } = authContext
	const [state, dispatch] = useReducer(eventReducer, initialState)

	/**
	 * Get Events
	 */
	const getEvents = async () => {
		try {
			let res = await HTTP.get('/api/events')
			dispatch({
				type: GET_EVENTS_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
			if (err.response.status === 401) {
				authError()
			}

			dispatch({
				type: GET_EVENTS_ERROR,
				payload: err.response.msg,
			})
		}
	}

	/**
	 *
	 * @param {*} slug
	 */
	const getEventBySlug = async (slug) => {
		dispatch({
			type: LOAD_EVENT,
		})
		try {
			let res = await HTTP.get('/api/events/' + slug)

			dispatch({
				type: LOAD_EVENT_SUCCESS,
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: LOAD_EVENT_ERROR,
				payload: err.response.data.msg,
			})
		}
	}

	/**
	 *
	 * @param {*} event
	 */
	const createEvent = async (event) => {
		dispatch({
			type: CREATE_EVENT,
			payload: null,
		})
		try {
			let res = await HTTP.post('/api/events', event)
			dispatch({
				type: CREATE_EVENT_SUCCESS,
			})
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
				event: state.event,
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
				getEventBySlug,
			}}
		>
			{props.children}
		</EventContext.Provider>
	)
}

export default EventState
