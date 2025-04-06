import React, { useState } from 'react';
import "./Dashboard.css";

const HRDashboard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [candidateFeedback, setCandidateFeedback] = useState('');

  const handlePostJob = () => {
    const newJob = {
      title: jobTitle,
      description: jobDescription,
    };
    setJobPostings([...jobPostings, newJob]);
    setJobTitle('');
    setJobDescription('');
  };

  const handleCandidateFeedback = (candidateName) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.name === candidateName
          ? { ...candidate, feedback: candidateFeedback }
          : candidate
      )
    );
    setCandidateFeedback('');
  };

  return (
    <div className="dashboard">
      <h2>HR Dashboard</h2>
      
      {/* Job Postings */}
      <div className="dashboard-section">
        <h3>Post a Job</h3>
        <input
          className="dashboard-input"
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <textarea
          className="dashboard-input"
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <button className="dashboard-button" onClick={handlePostJob}>Post Job</button>
      </div>

      <div className="dashboard-section">
        <h3>Posted Jobs</h3>
        <div className="dashboard-list">
          {jobPostings.map((job, index) => (
            <div className="dashboard-list-item" key={index}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Ranking */}
      <div className="dashboard-section">
        <h3>Candidate Rankings</h3>
        <div className="dashboard-list">
          {candidates.map((candidate, index) => (
            <div className="dashboard-list-item" key={index}>
              <p>{candidate.name}</p>
              <textarea
                className="dashboard-input"
                placeholder="Feedback"
                value={candidate.feedback || ''}
                onChange={(e) => setCandidateFeedback(e.target.value)}
              />
              <button 
                className="dashboard-button"
                onClick={() => handleCandidateFeedback(candidate.name)}
              >
                Submit Feedback
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="dashboard-section">
        <h3>Statistics</h3>
        <div className="statistics-grid">
          <div className="stat-card">
            <h4>Job Postings</h4>
            <p>{jobPostings.length}</p>
          </div>
          <div className="stat-card">
            <h4>Candidates</h4>
            <p>{candidates.length}</p>
          </div>
          <div className="stat-card">
            <h4>Avg Score</h4>
            <p>8.2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
