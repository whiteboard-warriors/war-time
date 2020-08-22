import {
	GET_LOCATIONS,
	ADD_LOCATION,
	DELETE_LOCATION,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOCATION,
	FILTER_LOCATIONS,
	CLEAR_FILTER,
	LOCATION_ERROR,
	CLEAR_LOCATIONS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_LOCATIONS:
			return {
				...state,
				locations: action.payload,
				loading: false,
			};
		case ADD_LOCATION:
			return {
				...state,
				locations: action.payload,
				loading: false,
			};
		case UPDATE_LOCATION:
			return {
				...state,
				locations: state.locations.map((location) =>
					location._id === action.payload._id
						? action.payload
						: location
				),
				loading: false,
			};
		case DELETE_LOCATION:
			return {
				...state,
				locations: state.locations.filter(
					(location) => location._id !== action.payload
				),
				loading: false,
			};
		case CLEAR_LOCATIONS:
			return {
				...state,
				locations: null,
				filtered: null,
				error: null,
				current: null,
			};
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
		case FILTER_LOCATIONS:
			return {
				...state,
				filtered: state.locations.filter((location) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return (
						location.name.match(regex) ||
						location.street.match(regex)
					);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case LOCATION_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
