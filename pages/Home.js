import React from "react";
import "./Home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <section className="hero-section">
          <h1>Resume Screening Pro</h1>
          <p className="hero-subtitle">
            Transforming Recruitment Through AI-Powered Intelligence
          </p>
          <div className="cta-buttons">
            <a href="/ResumeStandizer" className="primary-button">Get Started</a>
            <a href="/about" className="secondary-button">Learn More</a>
          </div>
        </section>
        
        <section className="about-section">
          <h2>About Our Platform</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Our advanced Resume Screening System revolutionizes the hiring process by leveraging 
                cutting-edge technology to streamline candidate evaluation. Designed for recruiters 
                and hiring managers, our platform transforms traditional resume screening through 
                intelligent automation and data-driven insights.
              </p>
            </div>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">75%</span>
                <span className="stat-label">Time Saved</span>
              </div>
            </div>
          </div>
        </section>

        <section className="main-feature">
          <h2>Automated Resume Parsing</h2>
          <div className="feature-content">
            <p>
              Our system automatically extracts and analyzes key information from resumes, 
              including skills, experience, education, and certifications. This eliminates 
              manual data entry and ensures consistent evaluation of all applicants.
            </p>
            <a href="/ResumeStandizer" className="feature-button">Learn More</a>
          </div>
        </section>

        <section className="features-grid">
          <div className="feature-card">
            <div className="card-icon">📊</div>
            <h3>Resume Scoring</h3>
            <p>Automated scoring system for candidate resumes</p>
            <a href="/ResumeScoring" className="feature-button">Try Now</a>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">👥</div>
            <h3>Candidate Scoring</h3>
            <p>Comprehensive evaluation of candidates</p>
            <a href="/CandidateScoring" className="feature-button">Try Now</a>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">📈</div>
            <h3>Analytics Dashboard</h3>
            <p>Visualize hiring metrics and trends</p>
            <a href="/AnalyticsDashboard" className="feature-button">View Demo</a>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">🎯</div>
            <h3>Job Matching</h3>
            <p>AI-powered candidate-job matching</p>
            <a href="/JobMatching" className="feature-button">Try Now</a>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">🔍</div>
            <h3>Candidate Search</h3>
            <p>Advanced search for ideal candidates</p>
            <a href="/CandidateSearch" className="feature-button">Search Now</a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
