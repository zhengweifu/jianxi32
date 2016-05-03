import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('jy-app'));
