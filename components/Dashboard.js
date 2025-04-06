import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "applicant";
    setUserRole(role);
    
    const timer = setTimeout(() => {
      setLoading(false);
      if (role === 'hr') {
        navigate("/hrdashboard");
      } else if (role === 'applicant') {
        navigate("/applicantdashboard");
      }
    }, 2000); // Add a small delay for better UX

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>
      
      <div className="dashboard-section">
        <h3>Redirecting to Your Personalized Dashboard</h3>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="redirect-message">
            Preparing your {userRole === 'hr' ? 'HR' : 'Applicant'} Dashboard...
          </p>
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Dashboard Features</h3>
        <div className="statistics-grid">
          <div className="stat-card">
            <h4>HR Dashboard</h4>
            <p>Manage jobs and candidates</p>
          </div>
          <div className="stat-card">
            <h4>Applicant Dashboard</h4>
            <p>Track applications and matches</p>
          </div>
          <div className="stat-card">
            <h4>Analytics</h4>
            <p>View personalized insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
