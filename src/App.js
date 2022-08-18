import React from 'react';
import Context from './context';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import Auth from './components/auth';
import Photo from './components/photo';

const App = () => {
  return (        
    <Router>
        <div></div>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/photo/:id" element={<Photo />} />
      </Routes> 
    </Router>      
  )
}

export default App;

