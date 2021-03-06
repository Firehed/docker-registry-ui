// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App domain="registry.ericstern.com" />, document.getElementById('root'));
registerServiceWorker();
