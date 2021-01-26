import React from 'react';

import { Button } from 'react-bootstrap';

import './style.scss';

const ConfirmCard = (props) => {
	const { type, name, purpose, action } = props;

	const uppercaseFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	return (
		<div className='delete-card-container'>
			<div className='delete-card'>
				<p>
					Are you sure you want to {purpose} this <b>{type}</b>
				</p>
				<h4>{name}</h4>
				<Button variant='danger'>
					{uppercaseFirstLetter(purpose)}
				</Button>
			</div>
		</div>
	);
};

export default ConfirmCard;
