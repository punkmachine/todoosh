import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage'

import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';

function App() {
	// TODO: добавить приватные роуты по таскам.

	return (
		<Router>
			<Header />
			<Switch>
				<main className="container">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={LoginPage} />
					<Route path="/registration" component={RegistrationPage} />
				</main>
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
