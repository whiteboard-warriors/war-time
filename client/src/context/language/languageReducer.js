import {
	GET_LANGUAGES,
	GET_LANGUAGES_SUCCESS,
	ADD_LANGUAGE,
	ADD_LANGUAGE_SUCCESS,
	DELETE_LANGUAGE,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LANGUAGE,
	UPDATE_LANGUAGE_SUCCESS,
	FILTER_LANGUAGES,
	CLEAR_FILTER,
	LANGUAGE_ERROR,
	CLEAR_LANGUAGES,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_LANGUAGES_SUCCESS:
			return {
				...state,
				languages: action.payload,
				loading: false,
			};
		case ADD_LANGUAGE_SUCCESS:
			return {
				...state,
				languages: action.payload,
				saveSuccess: true,
				saving: false,
			};
		case GET_LANGUAGES:
			return {
				...state,
				loading: true,
			};
		case ADD_LANGUAGE:
		case UPDATE_LANGUAGE:
			return {
				...state,
				saving: true,
			};
		case UPDATE_LANGUAGE_SUCCESS:
			return {
				...state,
				languages: state.languages.map((location) =>
					location._id === action.payload._id
						? action.payload
						: location
				),
				saving: false,
				saveSuccess: true,
			};
		case DELETE_LANGUAGE:
			return {
				...state,
				languages: state.languages.filter(
					(location) => location._id !== action.payload
				),
				loading: false,
			};
		case CLEAR_LANGUAGES:
			return {
				...state,
				languages: null,
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
		case FILTER_LANGUAGES:
			return {
				...state,
				filtered: state.languages.filter((location) => {
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
		case LANGUAGE_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
