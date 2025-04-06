import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const CleanHome = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Resume Screening</h1>
      <div className="button-container">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default CleanHome;
