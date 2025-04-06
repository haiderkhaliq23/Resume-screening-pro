import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to Resume Screening Pro</h1>
      <div className="homepage-content">
        <p>Your complete solution for automated resume screening and candidate evaluation.</p>
        <div className="homepage-actions">
          <Link to="/ResumeStandizer" className="homepage-button">Start Screening</Link>
          <Link to="/features" className="homepage-button">Explore Features</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
