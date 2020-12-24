import {
	GET_EVENTS_SUCCESS,
	GET_EVENTS,
	GET_EVENT_SUCCESS,
	GET_EVENT,
	CREATE_EVENT,
	CREATE_EVENT_SUCCESS,
	CLEAR_CREATE_EVENT_FLAGS,
	DELETE_EVENT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT,
	FILTER_EVENTS,
	CLEAR_FILTER,
	CREATE_EVENT_ERROR,
	CLEAR_EVENTS,
	LOAD_EVENT_SUCCESS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_EVENTS_SUCCESS:
			return {
				...state,
				events: action.payload,
				loading: false,
			};
		case GET_EVENT_SUCCESS:
			return {
				...state,
				event: action.payload,
				loading: false,
			};
		case GET_EVENTS:
		case GET_EVENT: {
			return {
				...state,
				loading: true,
			};
		}
		case CREATE_EVENT:
		case UPDATE_EVENT: {
			return {
				...state,
				saving: true,
			};
		}
		case CREATE_EVENT_SUCCESS:
			return {
				...state,
				saving: false,
				saveSuccess: true,
			};
		case UPDATE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.map((event) =>
					event._id === action.payload._id ? action.payload : event
				),
				loading: false,
				saveSuccess: true,
			};
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter(
					(event) => event._id !== action.payload
				),
				loading: false,
				saving: false,
			};
		case CLEAR_EVENTS:
			return {
				...state,
				events: null,
				filtered: null,
				error: null,
				current: null,
			};
		case CLEAR_CREATE_EVENT_FLAGS: {
			return {
				...state,
				error: null,
				saveSuccess: false,
				loading: false,
				saving: false,
			};
		}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case FILTER_EVENTS:
			return {
				...state,
				filtered: state.events.filter((event) => {
					console.log('event >> ', event);
					console.log('action.payload >> ', action.payload);
					const regex = new RegExp(`${action.payload}`, 'gi');
					return event.title.match(regex); // <uncomment and this and remove this memo when events start meeting in person>       || event.location.name.match(regex) || event.location.city.match(regex) || event.location.state(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case CREATE_EVENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case LOAD_EVENT_SUCCESS:
			return {
				...state,
				event: action.payload,
			};
		default:
			return state;
	}
};
