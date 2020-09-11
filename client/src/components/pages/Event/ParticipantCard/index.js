import React from 'react';

import './style.scss';

const ParticipantCard = ({
	imageLink,
	firstName,
	lastName,
	primaryLanguage,
}) => {
	//Uppercase first letter
	const ucFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div className='participant-card-container'>
			{imageLink ? (
				<div className='image'>
					<img src={imageLink} alt='profile' />
				</div>
			) : (
				<div className='icon'>
					<i className='fa fa-user'></i>
				</div>
			)}

			<p>–</p>
			<div className='user-name'>
				<p> {firstName ? `${firstName} ${lastName}` : 'First Last'}</p>
			</div>
			<p>–</p>
			<div className='user-language'>
				<p>
					{primaryLanguage
						? ucFirstLetter(primaryLanguage)
						: 'Primary Language'}
				</p>
			</div>
		</div>
	);
};

export default ParticipantCard;
