// AnalyticsDashboard.js
import React from "react";
import "./AnalyticsDashboard.css";

const AnalyticsDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Analytics Dashboard</h1>
      <p className="dashboard-subtitle">Job application trends, top skills in demand, and hiring analytics</p>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Applicants</h3>
          <p>1,245</p>
        </div>
        <div className="card">
          <h3>Interviews Scheduled</h3>
          <p>321</p>
        </div>
        <div className="card">
          <h3>Hires</h3>
          <p>85</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box">
          <h3>Job Application Trends</h3>
          <div className="chart-placeholder">📈 (Line Chart Placeholder)</div>
        </div>

        <div className="chart-box">
          <h3>Top Skills in Demand</h3>
          <div className="chart-placeholder">📊 (Bar Chart Placeholder)</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
