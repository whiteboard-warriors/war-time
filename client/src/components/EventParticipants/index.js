import React, { Fragment } from 'react'

import ParticipantCard from '../pages/Event/ParticipantCard'

import './style.scss'

/**
 *
 * @param {*} props
 */
const EventParticipants = (props) => {
	// establish socket connection
	useEffect(() => {
		return () => {}
	}, [])(() => {})

	return (
		<Fragment>
			<div className="text-center pb-3">
				<h4>Participants</h4>
			</div>
			<hr></hr>
			{attendees.map((attendeeObj, index) => {
				;<ParticipantCard
					key={index}
					imageLink={`https://mdbootstrap.com/img/Photos/Avatars/avatar-${
						index + 1
					}.jpg`}
					firstName={attendeeObj.attendee.firstName}
					lastName={attendeeObj.attendee.lastName}
					primaryLanguage={attendeeObj.attendee.primaryLanguage}
				/>
			})}
		</Fragment>
	)
}

export default EventParticipants
