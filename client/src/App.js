import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Bootstrap
import { Container } from 'react-bootstrap';
// Pages
import Home from './components/pages/Home';
import Landing from './components/pages/Landing';
import Login from './components/pages/auth/Login';
import Signup from './components/pages/auth/Signup';
import Profile from './components/pages/Profile';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import Event from './components/pages/Event';
//Admin Pages
import Admin from './components/pages/Admin';
import AddLanguage from './components/pages/Admin/AddLanguage';
import AddLocation from './components/pages/Admin/AddLocation';
import CreateEvent from './components/pages/Admin/CreateEvent';
import EditEvent from './components/pages/Admin/EditEvent';
//Private Route
// import PrivateRoute from './components/routing/PrivateRoute';
//Components
import Alerts from './components/Alerts';
import Navbar from './components/Navbar';
//State
import EventState from './context/event/EventState';
import LocationState from './context/location/LocationState';
import LanguageState from './context/language/LanguageState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

// Auth token
import setAuthToken from './utils/setAuthToken';
//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<EventState>
				<LocationState>
					<LanguageState>
						<AlertState>
							<Router>
								<Fragment>
									<Navbar></Navbar>
									<Container>
										<Alerts />
									</Container>
									<Switch>
										<Route
											exact
											path='/landing'
											component={Landing}
										/>
										<Route
											exact
											path='/'
											component={Home}
										/>
										<Route
											exact
											path='/event/:slug'
											component={Event}
										/>
										<Route
											exact
											path='/admin'
											component={Admin}
										/>
										<Route
											exact
											path='/admin/create-event'
											component={CreateEvent}
										/>
										<Route
											exact
											path='/admin/edit-event/:id'
											component={EditEvent}
										/>
										<Route
											exact
											path='/admin/add-language'
											component={AddLanguage}
										/>
										<Route
											exact
											path='/admin/add-location'
											component={AddLocation}
										/>

										<Route
											exact
											path='/signup'
											component={Signup}
										/>
										<Route
											exact
											path='/login'
											component={Login}
										/>
										<Route
											exact
											path='/profile'
											component={Profile}
										/>
										<Route
											exact
											path='/forgot-password'
											component={ForgotPassword}
										></Route>
										<Route
											exact
											path='/reset-password'
											component={ResetPassword}
										></Route>
									</Switch>
								</Fragment>
							</Router>
						</AlertState>
					</LanguageState>
				</LocationState>
			</EventState>
		</AuthState>
	);
};

export default App;
