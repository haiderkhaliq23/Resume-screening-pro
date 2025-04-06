import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('profileData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      phone: '',
      address: '',
      bio: ''
    };
  });

  const [profilePic, setProfilePic] = useState(null);
  const [resume, setResume] = useState(null);
  const [preview, setPreview] = useState(() => {
    const savedPic = localStorage.getItem('profilePic');
    return savedPic || null;
  });
  const [submitted, setSubmitted] = useState(false);

  // Load resume from localStorage if available
  useEffect(() => {
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
      const resumeBlob = new Blob([savedResume], { type: 'application/pdf' });
      setResume(new File([resumeBlob], 'resume.pdf'));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save form data to localStorage
    localStorage.setItem('profileData', JSON.stringify(formData));
    
    // Save profile pic as data URL if new one was uploaded
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('profilePic', reader.result);
      };
      reader.readAsDataURL(profilePic);
    }

    // Save resume file if new one was uploaded
    if (resume) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem('resume', reader.result);
      };
      reader.readAsArrayBuffer(resume);
    }

    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <div className="dashboard">
      <h2>Professional Profile</h2>
      
      {!submitted ? (
        <div className="dashboard-section">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="dashboard-input"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="dashboard-input"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="dashboard-input"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="dashboard-input"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Professional Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="dashboard-input"
                placeholder="Tell us about your professional journey..."
              />
            </div>

            <div className="upload-section">
              <div className="upload-card">
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="file-input"
                />
                {preview && <img src={preview} alt="Preview" className="upload-preview" />}
              </div>

              <div className="upload-card">
                <label>Resume (PDF/DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="file-input"
                />
                {resume && <p className="file-name">{resume.name}</p>}
              </div>
            </div>

            <button type="submit" className="dashboard-button">Save Profile</button>
          </form>
        </div>
      ) : (
        <div className="profile-display dashboard-section">
          <button onClick={handleEdit} className="edit-button">
            <i className="fas fa-edit"></i> Edit Profile
          </button>
          
          <div className="profile-header">
            <div className="profile-avatar">
              {preview && <img src={preview} alt="Profile" />}
            </div>
            <div className="profile-info">
              <h3>{formData.name}</h3>
              <div className="contact-info">
                <span>{formData.email}</span>
                {formData.phone && <span>{formData.phone}</span>}
              </div>
            </div>
          </div>

          <div className="profile-content">
            <div className="info-section">
              <h4>Location</h4>
              <p>{formData.address || 'Not specified'}</p>
            </div>

            <div className="info-section">
              <h4>About</h4>
              <p>{formData.bio || 'No bio provided'}</p>
            </div>

            {resume && (
              <div className="info-section">
                <h4>Resume</h4>
                <a href={URL.createObjectURL(resume)} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="resume-button">
                  <i className="fas fa-file-pdf"></i> View Resume
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
