import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
// import setAuthToken from '../../utils/setAuthToken';
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
	// RESET_PASSWORD_SUCCESS,
	// RESET_PASSWORD_FAIL,
} from '../types';

/**
 *
 * @param {*} props
 */
const AuthState = (props) => {
	const initialState = {
		isAuthenticated: false,
		loading: true,
		user:
			localStorage.getItem('user') != null
				? JSON.parse(localStorage.getItem('user'))
				: {},
		error: null,
		forgotResetSuccess: false,
		forgotRequestSuccess: false,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load User
	const loadUser = async () => {
		try {
			const res = await axios.get('/api/users/');

			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	/**
	 * Register User
	 * @param {*} formData
	 */
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users/', formData, config);

			dispatch({
				type: SIGNUP_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: SIGNUP_FAIL,
				payload: err.response.data.msg,
			});
		}
	};
	/**
	 * Update User Profile
	 * @param {*} formData
	 */
	const updateUserProfile = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				'/api/users/' + formData.id,
				formData,
				config
			);

			dispatch({
				type: UPDATE_PROFILE_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: UPDATE_PROFILE_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	/**
	 * Login User
	 * @param {*} formData
	 */
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth/login', formData, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg,
			});
		}
	};

	/**
	 *
	 * @param {*} formData
	 */
	const forgotPassword = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post(
				'/api/users/forgot-password-init',
				formData,
				config
			);

			dispatch({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: res.body,
			});
		} catch (err) {
			console.error(err);
		}
	};

	/**
	 *
	 * @param {*} formData
	 */
	const forgotPasswordComplete = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post(
				'/api/users/forgot-password-complete',
				formData,
				config
			);

			dispatch({
				type: FORGOT_RESET_SUCCESS,
				payload: res.body,
			});
		} catch (err) {
			console.error(err);
			dispatch({
				type: FORGOT_RESET_FAIL,
				payload: { error: err.response.data.msg },
			});
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<AuthContext.Provider
			value={{
				// token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				forgotResetSuccess: state.forgotResetSuccess,
				forgotRequestSuccess: state.forgotRequestSuccess,
				register,
				loadUser,
				updateUserProfile,
				login,
				logout,
				clearErrors,
				forgotPassword,
				forgotPasswordComplete,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
