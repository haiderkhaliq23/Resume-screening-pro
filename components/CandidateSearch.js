import React, { useState } from "react";
import "./CandidateSearch.css";

const mockCandidates = [
  { name: "John Doe", skills: "React, Node", location: "New York", experience: "3 years" },
  { name: "Jane Smith", skills: "Python, Django", location: "San Francisco", experience: "5 years" },
  { name: "Alice Johnson", skills: "Java, Spring", location: "Austin", experience: "4 years" },
];

const CandidateSearch = () => {
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = mockCandidates.filter((candidate) => {
      return (
        candidate.skills.toLowerCase().includes(skills.toLowerCase()) &&
        candidate.location.toLowerCase().includes(location.toLowerCase()) &&
        candidate.experience.toLowerCase().includes(experience.toLowerCase())
      );
    });
    setResults(filtered);
  };

  return (
    <div className="search-container">
      <div className="search-card">
        <h2>Find Talented Candidates</h2>
        <p className="search-subtitle">Search through our pool of qualified professionals</p>

        <div className="search-form">
          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              placeholder="e.g., React, Python, Java"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g., New York, Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              placeholder="e.g., 2 years, Senior"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={handleSearch}>
            <i className="fas fa-search"></i>
            Search Candidates
          </button>
        </div>

        <div className="results-grid">
          {results.length > 0 ? (
            results.map((candidate, index) => (
              <div key={index} className="candidate-card">
                <div className="candidate-header">
                  <h3>{candidate.name}</h3>
                  <span className="experience-badge">{candidate.experience}</span>
                </div>
                <div className="candidate-details">
                  <div className="detail-item">
                    <i className="fas fa-code"></i>
                    <span>{candidate.skills}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{candidate.location}</span>
                  </div>
                </div>
                <button className="contact-button">Contact Candidate</button>
              </div>
            ))
          ) : (
            <p className="no-results">No candidates found matching your criteria</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
