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
		pair,
		edit,
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
						{pair && (
							<Button variant='warning' size='md' onClick={pair}>
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
