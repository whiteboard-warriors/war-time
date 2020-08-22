import React, { useReducer } from 'react';
import axios from 'axios';
import LocationContext from './locationContext';
import locationReducer from './locationReducer';
import {
	GET_LOCATIONS,
	ADD_LOCATION,
	DELETE_LOCATION,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_LOCATION,
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
	};

	const [state, dispatch] = useReducer(locationReducer, initialState);

	// Get Locations
	const getLocations = async () => {
		try {
			const res = await axios.get('/api/locations');

			dispatch({
				type: GET_LOCATIONS,
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
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/locations', location, config);

			dispatch({
				type: ADD_LOCATION,
				payload: res.data,
			});
		} catch (err) {
			console.log('add location err >>> ', err);
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
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/location/${location._id}`,
				location,
				config
			);

			dispatch({
				type: UPDATE_LOCATION,
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
