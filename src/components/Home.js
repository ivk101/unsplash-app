import React from 'react';
import { NavLink, Link } from 'react-router';
import {
  useLocation
} from "react-router-dom";
import { setAccessTokenUnplash } from '../unsplash/'; 
import { authenticationUrl } from '../unsplash/';

function App() { 
	const handleClick = () => {
	    window.location.assign(authenticationUrl);
	}

	const token = localStorage.getItem('token');

	return (
		<main>
		  <header className="header">
		    <div className="container-my">
		        <h1>Unsplash App</h1>
		    </div>
		  </header>
		  <div className="registration">
		         <p>Авторизация через Unslash.com</p>
	             <button className="button_auth" onClick={handleClick}>Authorization</button>	          
	      </div>
	    </main>
	)

}

export default App;