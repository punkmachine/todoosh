import React from 'react';

import './App.scss';

import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { Main } from './components/layout/main';

function App() {
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	);
}

export default App;
