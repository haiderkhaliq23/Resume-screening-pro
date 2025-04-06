import React, { useState } from 'react';
import "./Dashboard.css";

const ApplicantDashboard = () => {
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [socialMedia, setSocialMedia] = useState({
    linkedin: '',
    github: '',
    twitter: ''
  });
  const [socialLinks, setSocialLinks] = useState([]);

  const [applications, setApplications] = useState([
    { job: 'Software Developer', status: 'Pending', feedback: '' },
    { job: 'Data Analyst', status: 'Interview Scheduled', feedback: '' },
  ]);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSocialMediaChange = (platform, value) => {
    setSocialMedia(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  const addSocialLink = () => {
    if (socialMedia.linkedin || socialMedia.github || socialMedia.twitter) {
      setSocialLinks(prev => [...prev, {...socialMedia}]);
      setSocialMedia({
        linkedin: '',
        github: '',
        twitter: ''
      });
    }
  };

  const handleUpload = () => {
    if (resume || photo) {
      // In a real app, you would upload to a server here
      setUploadStatus('Files uploaded successfully!');
      setResume(null);
      setPhoto(null);
    } else {
      setUploadStatus('Please select at least one file to upload');
    }
  };

  const [interviewFeedback, setInterviewFeedback] = useState('');

  const handleUpdateFeedback = (jobTitle) => {
    setApplications(
      applications.map((application) =>
        application.job === jobTitle
          ? { ...application, feedback: interviewFeedback }
          : application
      )
    );
    setInterviewFeedback('');
  };

  return (
    <div className="dashboard">
      <h2>Applicant Dashboard</h2>

      <div className="dashboard-grid">
        {/* Profile Overview Section */}
        <div className="dashboard-section">
          <h3>Profile Overview</h3>
          <div className="profile-stats">
            <div className="stat-card">
              <h4>Applications</h4>
              <p>{applications.length}</p>
            </div>
            <div className="stat-card">
              <h4>Interviews</h4>
              <p>{applications.filter(app => app.status === 'Interview Scheduled').length}</p>
            </div>
            <div className="stat-card">
              <h4>Profile Views</h4>
              <p>24</p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="dashboard-section">
          <h3>Professional Profiles</h3>
          <div className="social-inputs">
            {['linkedin', 'github', 'twitter'].map((platform) => (
              <div className="input-group" key={platform}>
                <label>{platform.charAt(0).toUpperCase() + platform.slice(1)}:</label>
                <input 
                  type="text" 
                  className="dashboard-input"
                  placeholder={`https://${platform}.com/yourprofile`}
                  value={socialMedia[platform]}
                  onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                />
              </div>
            ))}
            <button className="dashboard-button" onClick={addSocialLink}>Add Social Links</button>
          </div>

          {socialLinks.length > 0 && (
            <div className="social-links-list">
              <h4>Connected Profiles</h4>
              <div className="links-grid">
                {socialLinks.map((links, index) => (
                  <div key={index} className="social-link-card">
                    {Object.entries(links).map(([platform, url]) => (
                      url && (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" 
                           className="social-link">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      )
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Document Upload Section */}
        <div className="dashboard-section">
          <h3>Document Management</h3>
          <div className="upload-grid">
            <div className="upload-card">
              <h4>Resume Upload</h4>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} 
                     className="file-input" />
              <p className="file-info">Accepted formats: PDF, DOC, DOCX</p>
            </div>
            <div className="upload-card">
              <h4>Profile Photo</h4>
              <input type="file" accept="image/*" onChange={handlePhotoChange} 
                     className="file-input" />
              <p className="file-info">Recommended: Square image, max 5MB</p>
            </div>
            <button className="dashboard-button full-width" onClick={handleUpload}>
              Upload Files
            </button>
            {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
          </div>
        </div>

        {/* Application Status Section */}
        <div className="dashboard-section">
          <h3>Application Tracker</h3>
          <div className="applications-grid">
            {applications.map((application, index) => (
              <div key={index} className="application-card">
                <div className="application-header">
                  <h4>{application.job}</h4>
                  <span className={`status-badge ${application.status.toLowerCase()}`}>
                    {application.status}
                  </span>
                </div>
                {application.status === 'Interview Scheduled' && (
                  <div className="feedback-section">
                    <textarea
                      className="dashboard-input"
                      placeholder="Share your interview experience..."
                      value={interviewFeedback}
                      onChange={(e) => setInterviewFeedback(e.target.value)}
                    />
                    <button 
                      className="dashboard-button"
                      onClick={() => handleUpdateFeedback(application.job)}
                    >
                      Submit Feedback
                    </button>
                    {application.feedback && (
                      <p className="feedback-text">{application.feedback}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
