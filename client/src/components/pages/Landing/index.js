import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './style.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// 	faUtensils,
// 	faCalendarAlt,
// 	faHotdog,
// 	faUsers,
// } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
	return (
		<Fragment>
			<Container>
				<Row>
					<Col
						md={{ span: 8, offset: 2 }}
						className='text-center masthead'
					>
						<h1 className='mt-5 heading'>It's Time To Code</h1>
					</Col>
					<Col
						md={{ span: 12, offset: 0 }}
						className='text-center py-5'
					>
						<p className='mt-5 description'>
							War-time is the place where coding warriors come
							together and sharpen their skills.
						</p>
					</Col>
				</Row>
				<Row>
					<Col
						md={{ span: 8, offset: 2 }}
						className='text-center py-5 cta-buttons'
					>
						<Link className='btn btn-warning btn-lg' to='/signup'>
							Signup
						</Link>
						<Link className='btn btn-secondary btn-lg' to='/login'>
							Login
						</Link>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Landing;
