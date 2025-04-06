import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const ResumeScoringPage = () => {
  const [resumeText, setResumeText] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
  
    setLoading(true);
    setFileUploaded(true); // ✅ Set immediately when file is selected
  
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
  
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const loadingTask = pdfjsLib.getDocument({ data: typedArray });
      const pdf = await loadingTask.promise;
  
      let fullText = "";
  
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map((item) => item.str).join(" ") + " ";
      }
  
      setResumeText(fullText);
      setLoading(false);
      setShowScore(false);
    };
  };
  
  
  

  const handleCalculateClick = () => {
    if (!fileUploaded) {
      alert("Please upload a PDF first.");
      return;
    }

    setShowScore(true);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "10px", color: "#2c3e50" }}>Resume Scoring</h2>
        <p style={{ marginBottom: "30px", color: "#7f8c8d" }}>
          Upload your resume (PDF) and calculate your score.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            width: "100%"
          }}
        />

        {loading && <p style={{ color: "#2980b9" }}>Processing PDF...</p>}

        <button
          onClick={handleCalculateClick}
          style={{
            backgroundColor: "#3498db",
            color: "#fff",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Calculate Score
        </button>

        {showScore && (
          <div style={{ marginTop: "30px", position: "relative", width: "150px", height: "150px", margin: "30px auto" }}>
            <svg width="150" height="150">
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke="#ecf0f1"
                strokeWidth="15"
                fill="none"
              />
              <circle
                cx="75"
                cy="75"
                r="65"
                stroke="#3498db"
                strokeWidth="15"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 65}`}
                strokeDashoffset={`${2 * Math.PI * 65 * (1 - 0.73)}`}
                strokeLinecap="round"
                transform="rotate(-90 75 75)"
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="24px"
                fill="#2c3e50"
              >
                73%
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeScoringPage;
