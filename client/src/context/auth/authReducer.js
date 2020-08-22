import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_RESET_SUCCESS,
	FORGOT_RESET_FAIL,
} from '../types'

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			localStorage.setItem('user', JSON.stringify(action.payload))
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			}
		case SIGNUP_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('isAuthenticated', true)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case SIGNUP_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
			return {
				...state,
				error: action.payload,
			}
		case LOGOUT:
			localStorage.removeItem('isAuthenticated')
			localStorage.removeItem('user')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: {
					firstName: '',
				},
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		case UPDATE_PROFILE_SUCCESS:
			localStorage.setItem('user', JSON.stringify(action.payload))
			return {
				...state,
				user: action.payload,
				updateProfileSuccess: true,
			}
		case UPDATE_PROFILE_FAIL:
			return state
		case FORGOT_PASSWORD_SUCCESS:
			localStorage.removeItem('isAuthenticated')
			localStorage.removeItem('user')
			return { ...state, error: null, forgotRequestSuccess: true }
		case FORGOT_RESET_SUCCESS:
			return { ...state, error: null, forgotResetSuccess: true }
		case FORGOT_RESET_FAIL:
			return { ...state, error: action.payload.error }
		default:
			return state
	}
}
