import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
// Bootstrap
import Button from 'react-bootstrap/Button';
// Components
import DeleteModal from '../DeleteModal';
// State
import EventContext from '../../context/event/eventContext';
// Image and Styles
import wwLogo from './ww-logo.svg';

import './style.scss';

/**
 *
 * @param {*} props
 */
const EventCard = (props) => {
	const eventContext = useContext(EventContext);
	const { deleteEvent } = eventContext;

	const {
		image,
		title,
		location,
		date,
		time,
		slug,
		pairEvent,
		eventId,
	} = props;

	const [showModal, setShowModal] = useState(false);

	const openModal = () => {
		setShowModal((prev) => {
			console.log(prev);
			return !prev;
		});
	};

	return (
		<>
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
							{eventId && (
								<Button
									variant='danger'
									size='md'
									onClick={openModal}
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

			<DeleteModal
				showModal={showModal}
				setShowModal={setShowModal}
				id={eventId}
				action={deleteEvent}
				title={title}
				type={'event'}
			/>
		</>
	);
};

export default EventCard;
