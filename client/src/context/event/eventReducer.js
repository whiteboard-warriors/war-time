import {
	GET_EVENTS,
	CREATE_EVENT,
	CREATE_EVENT_SUCCESS,
	CLEAR_CREATE_EVENT_FLAGS,
	DELETE_EVENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_EVENT,
	FILTER_EVENTS,
	CLEAR_FILTER,
	CREATE_EVENT_ERROR,
	CLEAR_EVENTS,
} from '../types'

export default (state, action) => {
	switch (action.type) {
		case GET_EVENTS:
			return {
				...state,
				events: action.payload,
				loading: false,
			}
		case CREATE_EVENT: {
			return {
				...state,
				saving: true,
			}
		}
		case CREATE_EVENT_SUCCESS:
			let events = state.events
			return {
				...state,
				saving: false,
				saveSuccess: true,
			}
		case UPDATE_EVENT:
			return {
				...state,
				events: state.events.map((event) =>
					event._id === action.payload._id ? action.payload : event
				),
				loading: false,
			}
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter(
					(event) => event._id !== action.payload
				),
				loading: false,
			}
		case CLEAR_EVENTS:
			return {
				...state,
				events: null,
				filtered: null,
				error: null,
				current: null,
			}
		case CLEAR_CREATE_EVENT_FLAGS: {
			return {
				...state,
				error: null,
				saveSuccess: false,
				loading: false,
				saving: false,
			}
		}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case FILTER_EVENTS:
			return {
				...state,
				filtered: state.events.filter((event) => {
					const regex = new RegExp(`${action.payload}`, 'gi')
					return event.name.match(regex) || event.email.match(regex)
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}
		case CREATE_EVENT_ERROR:
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}
