import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';

import './App.scss';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';

function App() {
	return (
		<>
			<Header />
			
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</Router>

			<Footer />
		</>
	);
}

export default App;
