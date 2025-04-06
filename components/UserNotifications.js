import React, { useState, useEffect } from "react";
import "./UserNotifications.css";

const mockNotifications = [
  {
    id: 1,
    type: "status",
    message: "Your application for Frontend Developer has been shortlisted!",
    time: "5 mins ago",
  },
  {
    id: 2,
    type: "interview",
    message: "Interview scheduled on April 8, 2025 at 2:00 PM",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "feedback",
    message: "HR Feedback: Great resume, strong in React. Expect follow-up soon.",
    time: "Yesterday",
  },
];

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating fetch from server
    setNotifications(mockNotifications);
  }, []);

  return (
    <div className="notifications-container">
      <h2>🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="no-notifications">No new notifications</p>
      ) : (
        <ul className="notifications-list">
          {notifications.map((notif) => (
            <li key={notif.id} className={`notification-card ${notif.type}`}>
              <p className="notif-message">{notif.message}</p>
              <span className="notif-time">{notif.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications;
