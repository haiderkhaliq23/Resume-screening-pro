import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ResumeScreeningPro
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/hrdashboard" className="nav-link">HR Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/notifications" className="nav-link">Notifications</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <Link to="/job-matching" className="nav-link">Job Matching</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
