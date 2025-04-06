import React from 'react';
import { Link } from 'react-router-dom';
import './ProfessionalHome.css';

const ProfessionalHome = () => {
  return (
    <div className="professional-home">
      <header className="hero">
        <div className="container">
          <h1>Resume Screening Pro</h1>
          <p className="subtitle">AI-powered recruitment solutions</p>
          <div className="cta-container">
            <Link to="/login" className="cta-button primary">Get Started</Link>
            <Link to="/features" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">📊</div>
              <h3>Resume Analysis</h3>
              <p>Automated parsing and scoring</p>
            </div>
            <div className="feature-card">
              <div className="icon">🔍</div>
              <h3>Candidate Matching</h3>
              <p>Intelligent job matching</p>
            </div>
            <div className="feature-card">
              <div className="icon">📈</div>
              <h3>Analytics</h3>
              <p>Comprehensive metrics</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalHome;
