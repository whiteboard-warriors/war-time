/**
 * Combine HTTP Operations for cohesiveness
 */
import axios from 'axios'

export const get = async (url) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}
	try {
		const response = await axios.get(url)
		return response
	} catch (err) {
		throw err
	}
}

/**
 *
 * @param {*} url
 * @param {*} body
 */
export const post = async (url, body) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	try {
		const response = await axios.post(url, body, config)
		return response
	} catch (err) {
		throw err
	}
}
