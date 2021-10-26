import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';

import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';

function App() {
	return (
		<>
			<Header />
			
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={LoginPage} />
				</Switch>
			</Router>

			<Footer />
		</>
	);
}

export default App;
