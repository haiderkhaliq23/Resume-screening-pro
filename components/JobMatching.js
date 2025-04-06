import React, { useState } from "react";
import "./JobMatching.css";

const jobRoles = ["Frontend Developer", "Backend Developer", "Data Scientist", "DevOps Engineer"];

const mockMatches = {
  "Frontend Developer": [
    { name: "Alice", skills: "React, HTML, CSS", score: "92%", experience: "4 years", location: "New York" },
    { name: "Mark", skills: "Vue, JavaScript, Tailwind", score: "87%", experience: "3 years", location: "San Francisco" },
  ],
  "Backend Developer": [
    { name: "David", skills: "Node.js, Express, MongoDB", score: "90%", experience: "5 years", location: "Boston" },
    { name: "Lily", skills: "Django, PostgreSQL", score: "84%", experience: "2 years", location: "Seattle" },
  ],
  "Data Scientist": [
    { name: "Rita", skills: "Python, Pandas, ML", score: "95%", experience: "6 years", location: "Austin" },
    { name: "Sam", skills: "R, TensorFlow, SQL", score: "89%", experience: "4 years", location: "Chicago" },
  ],
  "DevOps Engineer": [
    { name: "Tom", skills: "AWS, Docker, Jenkins", score: "93%", experience: "5 years", location: "Denver" },
    { name: "Maya", skills: "Azure, Kubernetes, GitHub Actions", score: "88%", experience: "3 years", location: "Portland" },
  ],
};

const JobMatching = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMatch = () => {
    if (!selectedRole) {
      alert("Please select a job role.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMatches(mockMatches[selectedRole]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="dashboard">
      <h2>Job Matching System</h2>
      <div className="dashboard-section">
        <h3>Find Your Perfect Match</h3>
        <p className="section-description">
          Our AI-powered system matches candidates with roles based on skills and experience
        </p>

        <div className="search-container">
          <select 
            className="role-select"
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select a job role</option>
            {jobRoles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
          <button 
            className="match-button"
            onClick={handleMatch}
            disabled={isLoading}
          >
            {isLoading ? 'Matching...' : 'Find Matches'}
          </button>
        </div>

        <div className="matches-grid">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : matches.length > 0 ? (
            matches.map((candidate, index) => (
              <div key={index} className="match-card">
                <div className="match-header">
                  <h4>{candidate.name}</h4>
                  <span className="match-score">{candidate.score}</span>
                </div>
                <div className="match-details">
                  <div className="detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{candidate.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{candidate.location}</span>
                  </div>
                  <div className="skills-container">
                    {candidate.skills.split(', ').map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <button className="contact-button">Contact Candidate</button>
              </div>
            ))
          ) : (
            <p className="no-matches">Select a role and click 'Find Matches' to see candidates</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
