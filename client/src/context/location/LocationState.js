import React, { useReducer } from 'react';
import axios from 'axios';
import LocationContext from './locationContext';
import locationReducer from './locationReducer';
import * as HTTP from '../../service/HTTP';
import {
	GET_LOCATIONS,
	GET_LOCATIONS_SUCCESS,
	ADD_LOCATION,
	ADD_LOCATION_SUCCESS,
	DELETE_LOCATION,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOCATION,
	UPDATE_LOCATION_SUCCESS,
	FILTER_LOCATIONS,
	CLEAR_LOCATIONS,
	CLEAR_FILTER,
	LOCATION_ERROR,
} from '../types';

const LocationState = (props) => {
	const initialState = {
		locations: null,
		current: null,
		filtered: null,
		error: null,
		saving: false,
		loading: true,
		saveSuccess: false,
		event: null,
	};

	const [state, dispatch] = useReducer(locationReducer, initialState);

	// Get Locations
	const getLocations = async () => {
		dispatch({
			type: GET_LOCATIONS,
			payload: null,
		});
		try {
			const res = await HTTP.get('/api/locations');

			dispatch({
				type: GET_LOCATIONS_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LOCATION_ERROR,
				payload: err.response.msg,
			});
		}
	};

	// Add Location ** ADMIN
	const addLocation = async (location) => {
		dispatch({
			type: ADD_LOCATION,
			payload: null,
		});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await HTTP.post('/api/locations', location, config);

			dispatch({
				type: ADD_LOCATION_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LOCATION_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// Delete Location ** ADMIN
	const deleteLocation = async (id) => {
		try {
			await axios.delete(`/api/locations/${id}`);

			dispatch({
				type: DELETE_LOCATION,
				payload: id,
			});
		} catch (err) {
			dispatch({
				type: LOCATION_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	// Update Location ** ADMIN
	const updateLocation = async (location) => {
		dispatch({
			type: UPDATE_LOCATION,
			payload: null,
		});
		try {
			const res = await HTTP.put(
				`/api/location/${location._id}`,
				location
			);

			dispatch({
				type: UPDATE_LOCATION_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: LOCATION_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Clear Locations
	const clearLocations = () => {
		dispatch({ type: CLEAR_LOCATIONS });
	};

	// Set Current Location
	const setCurrent = (location) => {
		dispatch({ type: SET_CURRENT, payload: location });
	};

	// Clear Current Location
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Locations
	const filterLocations = (text) => {
		dispatch({ type: FILTER_LOCATIONS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<LocationContext.Provider
			value={{
				locations: state.locations,
				current: state.current,
				filtered: state.filtered,
				error: state.locationError,
				saving: state.saving,
				loading: state.loading,
				location: state.location,
				saveSuccess: state.saveSuccess,
				addLocation,
				deleteLocation,
				clearLocations,
				setCurrent,
				clearCurrent,
				updateLocation,
				filterLocations,
				clearFilter,
				getLocations,
			}}
		>
			{props.children}
		</LocationContext.Provider>
	);
};

export default LocationState;
