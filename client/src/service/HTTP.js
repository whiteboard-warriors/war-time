/**
 * Combine HTTP Operations for cohesiveness
 */
import axios from 'axios'

export const get = async (url) => {
	try {
		const res = await axios.get(url)
		return res.data
	} catch (error) {
		if (error == '401') {
		}
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
