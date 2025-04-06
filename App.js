import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnhancedHome from "./pages/EnhancedHome";
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import Dashboard from "./components/Dashboard";
import ResumeStandardizer from "./components/ResumeStandizer";
import ResumeScoring from "./components/ResumeScoring";
import CandidateScoring from "./components/CandidateScoring";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import CandidateSearch from "./components/CandidateSearch";
import JobPosting from "./components/JobPosting";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HRDashboard from './components/HRDashboard';
import ApplicantDashboard from "./components/ApplicantDashboard";
import CompanyDetails from "./components/CompanyDetails";
import Blogs from "./components/Blogs";
import Profile from "./components/Profile";
import JobMatching from "./components/JobMatching";
import UserNotifications from "./components/UserNotifications";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
      <div className="App">
        <Navbar />
        <div className="app-container">
          <div className="content">
            <Routes>
              <Route path="/" element={<EnhancedHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume-standardizer" element={<ResumeStandardizer />} />
              <Route path="/resume-scoring" element={<ResumeScoring />} />
              <Route path="/candidate-scoring" element={<CandidateScoring />} />
              <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
              <Route path="/candidate-search" element={<CandidateSearch />} />
              <Route path="/job-posting" element={<JobPosting />} />
              <Route path="/hrdashboard" element={<HRDashboard />} />
              <Route path="/applicantdashboard" element={<ApplicantDashboard />} />
              <Route path="/company" element={<CompanyDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<UserNotifications />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/job-matching" element={<JobMatching />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
        <ThemeToggle />
      </Router>
    </ThemeProvider>
  );
}

export default App;
