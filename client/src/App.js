import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Pages
import Home from './components/pages/Home'
import Landing from './components/pages/Landing'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import Profile from './components/pages/Profile'
import ForgotPassword from './components/pages/auth/ForgotPassword'
import ResetPassword from './components/pages/auth/ResetPassword'

// import PrivateRoute from './components/routing/PrivateRoute';

import Alerts from './components/Alerts'
import Navbar from './components/Navbar'
import EventState from './context/event/EventState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { Container } from 'react-bootstrap'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	return (
		<AuthState>
			<EventState>
				<AlertState>
					<Router>
						<Fragment>
							<Navbar></Navbar>
							<Container>
								<Alerts />
								<Switch>
									<Route
										exact
										path="/landing"
										component={Landing}
									/>
									<Route exact path="/" component={Home} />
									<Route
										exact
										path="/signup"
										component={Signup}
									/>
									<Route
										exact
										path="/login"
										component={Login}
									/>
									<Route
										exact
										path="/profile"
										component={Profile}
									/>
									<Route
										exact
										path="/forgot-password"
										component={ForgotPassword}
									></Route>
									<Route
										exact
										path="/reset-password"
										component={ResetPassword}
									></Route>
								</Switch>
							</Container>
						</Fragment>
					</Router>
				</AlertState>
			</EventState>
		</AuthState>
	)
}

export default App
