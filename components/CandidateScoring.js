// CandidateScoring.js
import React, { useState } from "react";
import "./CandidateScoring.css"; // Importing the CSS

const CandidateScoring = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUploaded(true);
      setShowScore(false);
    }
  };

  const handleCalculateClick = () => {
    if (!fileUploaded) {
      alert("Please upload a PDF first.");
      return;
    }
    setShowScore(true);
  };

  return (
    <div className="scoring-container">
      <div className="scoring-box">
        <h1 className="scoring-title">Candidate Scoring</h1>
        <p className="scoring-subtitle">
          AI evaluates and ranks applicants based on job requirements.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="file-input"
        />

        <button onClick={handleCalculateClick} className="calculate-button">
          Calculate Score
        </button>

        {showScore && (
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circular-chart blue">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray="73, 100"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">73%</text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateScoring;
