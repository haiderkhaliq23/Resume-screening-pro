import React from 'react';
import { Link } from 'react-router-dom';
import './EnhancedHome.css';

const EnhancedHome = () => {
  return (
    <div className="home-container">
      <section className="about-section">
        <h2>About Resume Screening Pro</h2>
        <p>
          Resume Screening Pro is an AI-powered recruitment solution that helps HR professionals
          streamline their hiring process. Our platform offers advanced tools for resume analysis,
          candidate matching, and recruitment analytics, making it easier to find the right talent
          for your organization.
        </p>
      </section>

      <section className="tools-section">
        <h2>Our Tools</h2>
        <div className="tools-grid">
          <div className="tool-card">
            <h3>Resume Standardizer</h3>
            <p>Normalize resume formats for consistent analysis</p>
            <Link to="/resume-standardizer" className="tool-btn">Use Tool</Link>
          </div>
          
          <div className="tool-card">
            <h3>Resume Scoring</h3>
            <p>Automated scoring of candidate resumes</p>
            <Link to="/resume-scoring" className="tool-btn">Use Tool</Link>
          </div>

          <div className="tool-card">
            <h3>Candidate Scoring</h3>
            <p>Comprehensive evaluation of candidates</p>
            <Link to="/candidate-scoring" className="tool-btn">Use Tool</Link>
          </div>

          <div className="tool-card">
            <h3>Analytics Dashboard</h3>
            <p>Track and analyze recruitment metrics</p>
            <Link to="/analytics-dashboard" className="tool-btn">View Dashboard</Link>
          </div>

          <div className="tool-card">
            <h3>Candidate Search</h3>
            <p>Find candidates based on specific criteria</p>
            <Link to="/candidate-search" className="tool-btn">Search Candidates</Link>
          </div>

          <div className="tool-card">
            <h3>Job Posting</h3>
            <p>Create and manage job postings</p>
            <Link to="/job-posting" className="tool-btn">Post a Job</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;
