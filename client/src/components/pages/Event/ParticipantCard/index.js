import React, { useContext } from 'react';
import AuthContext from '../../../../context/auth/authContext';

import './style.scss';

const ParticipantCard = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

	const ucFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div className='participant-card-container'>
			<div className='image'>
				<i className='fa fa-user'></i>
			</div>
			<p>––</p>
			<div className='user-name'>
				<h5>
					{user.firstName} {user.lastName}
				</h5>
			</div>
			<p>––</p>
			<div className='user-language'>
				<p className='lead'>{ucFirstLetter(user.primaryLanguage)}</p>
			</div>
		</div>
	);
};

export default ParticipantCard;
