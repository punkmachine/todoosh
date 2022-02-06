import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import './scss/main.scss';
import App from './App';

import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk)
));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);