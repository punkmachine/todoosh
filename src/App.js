import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage'

import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';

import { REGISTRATION_PAGE, LOGIN_PAGE } from './constants/route';

function App() {
	// TODO: добавить приватные роуты по таскам.

	return (
		<Router>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path={LOGIN_PAGE} component={LoginPage} />
					<Route path={REGISTRATION_PAGE} component={RegistrationPage} />
				</Switch>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
