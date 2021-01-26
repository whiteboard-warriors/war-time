import React from 'react';
import { Link } from 'react-router-dom';
// Bootstrap
import Button from 'react-bootstrap/Button';
// Image and Styles
import wwLogo from './ww-logo.svg';
import './style.scss';

/**
 *
 * @param {*} props
 */
const EventCard = (props) => {
	const {
		image,
		title,
		location,
		date,
		time,
		slug,
		pairEvent,
		eventId,
		deleteEvent,
	} = props;

	return (
		<div className='event-card'>
			<div className='img-container'>
				<img
					src={image ? image : wwLogo}
					alt='whiteboard warriors logo'
				/>
			</div>
			<div className='event-title'>
				<p className='lead'>{title ? title : 'Title'}</p>
			</div>
			<div className='info-container'>
				<div className='info-left'>
					<p>Location</p>
					<h6>{location}</h6>
					<br />
					<p>Date</p>
					<h6>{date}</h6>
				</div>
				<div className='info-right'>
					<p>Time</p>
					<h6>{time}</h6>
					<div className='info-buttons'>
						{pairEvent && (
							<Button
								variant='warning'
								size='md'
								onClick={pairEvent}
							>
								Pair
							</Button>
						)}
						{eventId && (
							<Link
								className='btn btn-secondary btn-md'
								to={`/admin/edit-event/${eventId}`}
							>
								Edit
							</Link>
						)}
						{deleteEvent && (
							<Button
								variant='danger'
								size='md'
								onClick={deleteEvent}
							>
								Delete
							</Button>
						)}
						{slug && (
							<Link
								className='btn btn-warning btn-md'
								to={`/event/${slug}`}
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
