import React from 'react';
//custom styles
import './style.scss';
//images
import cPlusPlus from './images/cplusplus.png';
import java from './images/java.png';
import go from './images/go.png';
import python from './images/python.png';
import ruby from './images/ruby.png';
import javascript from './images/javascript.png';

const PairCard = ({
	user1,
	user2,
	language,
	skillLevel,
	docLink,
	slackLink,
}) => {
	console.log('pair card language >>> ', language);
	//Uppercase first letter
	const ucFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	return (
		<div className='pair-card-container'>
			<div className='image'>
				{(() => {
					switch (language) {
						case 'c-cplusplus-java-go':
							return (
								<>
									<img
										src={cPlusPlus}
										alt='c plus plus'
									></img>
									<img src={java} alt='java'></img>
									<img src={go} alt='go'></img>
								</>
							);
						case 'python-ruby':
							return (
								<>
									<img src={python} alt='python'></img>
									<img src={ruby} alt='ruby'></img>
								</>
							);
						case 'javascript':
							return (
								<>
									<img
										src={javascript}
										alt='javascript'
									></img>
								</>
							);
						default:
							return <h3>Language</h3>;
					}
				})()}
			</div>
			<div className='matches'>
				{user1 && (
					<div className='user'>
						<p>
							<b>{ucFirstLetter(user1)}</b>
						</p>
					</div>
				)}
				{user2 && (
					<div className='user'>
						<p>
							<b>{ucFirstLetter(user2)}</b>
						</p>
					</div>
				)}
			</div>
			<div className='skill-level'>
				<p>Skill Level:</p>
				{skillLevel ? (
					<p>
						<b>{ucFirstLetter(skillLevel)}</b>
					</p>
				) : (
					<h5>
						<b>Level</b>
					</h5>
				)}
			</div>
			<div className='doc-link'>
				<a href={docLink} className='btn btn-primary'>
					Google Doc
				</a>
				<a href={slackLink} className=' text-white btn btn-warning'>
					Slack Link
				</a>
			</div>
		</div>
	);
};

export default PairCard;
