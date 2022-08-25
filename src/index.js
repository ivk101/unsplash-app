import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  store  from './app/store';
import { Provider } from 'react-redux';

window.localStorage.setItem('start', 0);

ReactDOM.render(
	<Provider store={store}>	  
        <App />              
    </Provider>,
	document.getElementById('root')
);

