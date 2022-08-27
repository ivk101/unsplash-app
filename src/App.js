import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/auth";
import Home from "./components/Home";
import Photo from "./components/photo";

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
  );
};

export default App;
