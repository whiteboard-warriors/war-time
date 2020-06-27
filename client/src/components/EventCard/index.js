import React from 'react';

// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './style.scss';

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
	} = props;
	return (
		<div className='event-card'>
			<div className='img-container'>
				<img src={image} alt='whiteboard warriors logo' />
			</div>
			<div className='info-container'>
				<div className='info-left'>
					<h3>Location</h3>
					<p>{location}</p>
					<h3>Date</h3>
					<p>{date}</p>
				</div>
				<div className='info-right'>
					<h3>Time</h3>
					<p>{time}</p>
					{pair && (
						<Button variant='danger' size='md' onClick={pair}>
							Pair
						</Button>
					)}
					{edit && (
						<Button variant='primary' size='md' onClick={edit}>
							Edit
						</Button>
					)}
					{deleteEvent && (
						<Button
							variant='primary'
							size='md'
							onClick={deleteEvent}
						>
							Delete
						</Button>
					)}
					{signIn && (
						<Button variant='primary' size='md' onClick={signIn}>
							Signin
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
