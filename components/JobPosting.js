import React, { useState } from "react";
import "./JobPosting.css";

const JobPosting = () => {
  const [jobs] = useState([
    { id: 1, title: "Software Engineer", company: "Google", description: "Develop scalable applications using modern tech stacks." },
    { id: 2, title: "Data Analyst", company: "Microsoft", description: "Analyze data trends to provide business insights." },
    { id: 3, title: "UI/UX Designer", company: "Apple", description: "Create beautiful and user-friendly interfaces." },
    { id: 4, title: "Project Manager", company: "Amazon", description: "Manage software development projects efficiently." },
    { id: 5, title: "Cybersecurity Specialist", company: "Tesla", description: "Ensure data security and prevent cyber threats." },
    { id: 6, title: "Cloud Engineer", company: "IBM", description: "Deploy and maintain cloud-based infrastructure." },
    { id: 7, title: "AI/ML Engineer", company: "OpenAI", description: "Build intelligent systems using deep learning models." },
    { id: 8, title: "Backend Developer", company: "Facebook", description: "Develop and optimize APIs and database interactions." },
    { id: 9, title: "DevOps Engineer", company: "Netflix", description: "Automate deployment and monitor infrastructure." },
    { id: 10, title: "Business Analyst", company: "Spotify", description: "Gather business requirements and improve operations." }
  ]);

  const handleApply = (jobTitle) => {
    alert(`You have applied for the ${jobTitle} position!`);
  };

  return (
    <div className="job-posting-container">
      <div className="job-posting-header">
        <h2>Available Positions</h2>
        <p className="subtitle">Discover your next career opportunity</p>
      </div>
      
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h3>{job.title}</h3>
              <span className="company-badge">{job.company}</span>
            </div>
            <div className="job-card-content">
              <p className="job-description">{job.description}</p>
              <div className="job-meta">
                <span className="location"><i className="fas fa-map-marker-alt"></i> Remote</span>
                <span className="job-type"><i className="fas fa-briefcase"></i> Full-time</span>
              </div>
            </div>
            <button 
              className="apply-button" 
              onClick={() => handleApply(job.title)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPosting;
