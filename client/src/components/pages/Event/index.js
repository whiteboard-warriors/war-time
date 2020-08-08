import React, { Fragment, useContext, useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
// import { Jumbotron, Button } from 'react-bootstrap';

import EventCard from '../../EventCard';

import './style.scss';

import events from '../../../0-temp-data/events';

import AuthContext from '../../../context/auth/authContext';

const Event = () => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, user } = authContext;

  return ( 
    <Fragment>
      <Container>
        <h1>Event</h1>
      </Container>  
    </Fragment>
  )
}

export default Event;
