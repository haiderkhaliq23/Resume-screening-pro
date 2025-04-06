import React from "react";
import "./Sidebar.css";

const Sidebar = ({ toggleSidebar }) => {
  return (
    <div className="sidebar">
      <button className="close-btn" onClick={toggleSidebar}>×</button> {/* Close button */}
      <ul>
        <li>Dashboard</li>
        <li>Job Postings</li>
        <li>Candidates</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
