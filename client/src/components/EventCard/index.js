import React from 'react'

// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'

import './style.scss'

/**
 *
 * @param {*} props
 */
const EventCard = (props) => {
	const {
		image,
		location,
		date,
		time,
		signIn,
		pair,
		edit,
		deleteEvent,
	} = props

	return (
		<div className="event-card">
			<div className="img-container">
				<img src={image} alt="whiteboard warriors logo" />
			</div>
			<div className="info-container">
				<div className="info-left">
					<p>Location</p>
					<h6>{location}</h6>
					<br />
					<p>Date</p>
					<h6>{date}Friday, July 3rd</h6>
				</div>
				<div className="info-right">
					<p>Time</p>
					<h6>{time} 7:00pm</h6>
					<div className="info-buttons">
						{pair && (
							<Button variant="warning" size="md" onClick={pair}>
								Pair
							</Button>
						)}
						{edit && (
							<Button variant="primary" size="md" onClick={edit}>
								Edit
							</Button>
						)}
						{deleteEvent && (
							<Button
								variant="danger"
								size="md"
								onClick={deleteEvent}
							>
								Delete
							</Button>
						)}
						{signIn && (
							<Button
								variant="warning"
								size="md"
								onClick={signIn}
							>
								Signin
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventCard
