const express = require('express');
const router = express.Router();
const { protect, hrOrAdmin, admin } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Placeholder routes for dashboard functionality

// @route   GET /api/dashboard/hr
// @desc    Get HR dashboard data
// @access  Private/HR/Admin
router.get('/hr', protect, hrOrAdmin, async (req, res) => {
  try {
    // Get the count of applicant users
    const applicantCount = await User.countDocuments({ role: 'applicant' });
    
    res.status(200).json({
      message: 'HR Dashboard data',
      stats: {
        totalJobs: 12,
        activeJobs: 8,
        totalApplicants: applicantCount,
        newApplicants: 18
      },
      recentApplications: [
        { id: '1', name: 'John Doe', position: 'Software Engineer', date: '2023-05-15' },
        { id: '2', name: 'Jane Smith', position: 'UX Designer', date: '2023-05-14' },
        { id: '3', name: 'Bob Johnson', position: 'Project Manager', date: '2023-05-13' }
      ]
    });
  } catch (error) {
    console.error("Error fetching HR dashboard data:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/dashboard/applicant
// @desc    Get applicant dashboard data
// @access  Private
router.get('/applicant', protect, (req, res) => {
  res.status(200).json({
    message: 'Applicant Dashboard data',
    stats: {
      appliedJobs: 5,
      interviews: 2,
      offers: 1
    },
    applications: [
      { id: '1', company: 'Tech Inc', position: 'Frontend Developer', status: 'Interview', date: '2023-05-10' },
      { id: '2', company: 'Design Co', position: 'UI Designer', status: 'Applied', date: '2023-05-12' },
      { id: '3', company: 'Software Ltd', position: 'Full Stack Developer', status: 'Offer', date: '2023-05-01' }
    ]
  });
});

// @route   GET /api/dashboard/admin
// @desc    Get admin dashboard data
// @access  Private/Admin
router.get('/admin', protect, admin, async (req, res) => {
  try {
    // Count users by role
    const applicantCount = await User.countDocuments({ role: 'applicant' });
    const hrCount = await User.countDocuments({ role: 'hr' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const totalUsers = applicantCount + hrCount + adminCount;
    
    res.status(200).json({
      message: 'Admin Dashboard data',
      stats: {
        totalUsers: totalUsers,
        totalJobs: 45,
        totalApplications: 560,
        totalCompanies: 15
      },
      usersByRole: {
        applicants: applicantCount,
        hr: hrCount,
        admin: adminCount
      }
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 