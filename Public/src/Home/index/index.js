import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App.js';

// import { createStore } from 'redux';

// import { Provider } from 'react-redux';

// import reducer from './reducers/index';

// console.log(reducer);

// let store = createStore(reducer);

// ReactDOM.render(
// 	<Provider store={store}>
// 	 	<App />
// 	</Provider>,
// 	document.getElementById('jy-app')
// );
// 
// 
ReactDOM.render(
	<App />,
	document.getElementById('app')
);