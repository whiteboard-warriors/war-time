import React, { useReducer } from 'react';
import axios from 'axios';
import LanguageContext from './languageContext';
import languageReducer from './languageReducer';
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
	CLEAR_LANGUAGES,
	CLEAR_FILTER,
	LANGUAGE_ERROR,
} from '../types';

const LanguageState = (props) => {
	const initialState = {
		languages: null,
		current: null,
		filtered: null,
		error: null,
		saving: false,
		loading: true,
		saveSuccess: false,
		language: null,
	};

	const [state, dispatch] = useReducer(languageReducer, initialState);

	// Get Languages
	const getLanguages = async () => {
		dispatch({
			type: GET_LANGUAGES,
			payload: null,
		});
		try {
			const res = await axios.get('/api/languages');

			dispatch({
				type: GET_LANGUAGES_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LANGUAGE_ERROR,
				payload: err.response.msg,
			});
		}
	};

	// Add Language ** ADMIN
	const addLanguage = async (language) => {
		dispatch({
			type: ADD_LANGUAGE,
			payload: null,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log('language from state = ', language);

		try {
			const res = await axios.post('/api/languages', language, config);

			dispatch({
				type: ADD_LANGUAGE_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			console.log('add language err >>> ', err);
			dispatch({
				type: LANGUAGE_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// Delete Language ** ADMIN
	const deleteLanguage = async (id) => {
		try {
			await axios.delete(`/api/languages/${id}`);

			dispatch({
				type: DELETE_LANGUAGE,
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: LANGUAGE_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// Update Language ** ADMIN
	const updateLanguage = async (language) => {
		dispatch({
			type: UPDATE_LANGUAGE,
			payload: null,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/language/${language._id}`,
				language,
				config
			);

			dispatch({
				type: UPDATE_LANGUAGE_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LANGUAGE_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Clear Languages
	const clearLanguages = () => {
		dispatch({ type: CLEAR_LANGUAGES });
	};

	// Set Current Language
	const setCurrent = (language) => {
		dispatch({ type: SET_CURRENT, payload: language });
	};

	// Clear Current Language
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Languages
	const filterLanguages = (text) => {
		dispatch({ type: FILTER_LANGUAGES, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<LanguageContext.Provider
			value={{
				languages: state.languages,
				current: state.current,
				filtered: state.filtered,
				error: state.languageError,
				saving: state.saving,
				loading: state.loading,
				saveSuccess: state.saveSuccess,
				language: state.language,
				addLanguage,
				deleteLanguage,
				clearLanguages,
				setCurrent,
				clearCurrent,
				updateLanguage,
				filterLanguages,
				clearFilter,
				getLanguages,
			}}
		>
			{props.children}
		</LanguageContext.Provider>
	);
};

export default LanguageState;
