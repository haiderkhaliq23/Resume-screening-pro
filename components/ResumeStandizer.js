import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./ResumeStandizer.css";

const ResumeStandardizer = () => {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setResumeText(e.target.result);
      reader.readAsText(file);
    } else {
      alert("Please upload a plain text (.txt) resume.");
    }
  };

  const generateStandardizedResume = () => {
    if (!resumeText) return;
    setIsLoading(true);

    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Standardized Resume", 20, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(resumeText, 20, 40, { maxWidth: 170 });
      doc.save("Standardized_Resume.pdf");
    } catch (error) {
      alert("Error generating PDF. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="standardizer-container">
      <div className="standardizer-card">
        <h2>Resume Standardizer</h2>
        <p className="subtitle">Convert your text resume into a professional PDF format</p>

        <div className="upload-section">
          <input 
            type="file" 
            accept=".txt" 
            onChange={handleFileUpload}
            className="file-input"
            id="resume-upload"
          />
          <label htmlFor="resume-upload" className="upload-label">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>Choose a file or drag it here</span>
            <span className="upload-hint">Supported format: .txt</span>
          </label>
          {fileName && <p className="file-name">{fileName}</p>}
        </div>

        <div className="editor-section">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Or paste your resume text here..."
            className="resume-textarea"
          />
        </div>

        <button
          onClick={generateStandardizedResume}
          className="standardize-button"
          disabled={!resumeText || isLoading}
        >
          {isLoading ? (
            <>
              <div className="button-spinner"></div>
              <span>Converting...</span>
            </>
          ) : (
            <>
              <i className="fas fa-file-pdf"></i>
              <span>Generate PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumeStandardizer;
