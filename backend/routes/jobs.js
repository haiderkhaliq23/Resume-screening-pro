const express = require('express');
const router = express.Router();
const { protect, hrOrAdmin } = require('../middleware/authMiddleware');

// Mock data for testing
const mockJobs = [
  { 
    _id: '1', 
    title: 'Frontend Developer', 
    company: 'TechCorp', 
    location: 'Remote', 
    description: 'Build modern web applications with React and TypeScript', 
    requirements: '3+ years experience with React', 
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
    postedDate: new Date().toISOString()
  },
  { 
    _id: '2', 
    title: 'Backend Developer', 
    company: 'DataSystems', 
    location: 'New York', 
    description: 'Develop scalable APIs and services', 
    requirements: 'Experience with Node.js and MongoDB', 
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    postedDate: new Date().toISOString()
  },
  { 
    _id: '3', 
    title: 'Full Stack Developer', 
    company: 'WebSolutions', 
    location: 'Boston', 
    description: 'Work on end-to-end features across our stack', 
    requirements: 'Full stack experience with React and Node.js', 
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    postedDate: new Date().toISOString()
  },
];

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', (req, res) => {
  // Return mock data - in a real app, you would fetch from the database
  res.status(200).json(mockJobs);
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', (req, res) => {
  const job = mockJobs.find(j => j._id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  res.status(200).json(job);
});

// @route   POST /api/jobs
// @desc    Create a job
// @access  Private/HR/Admin
router.post('/', (req, res) => {
  // For testing, we'll just return the request body with an ID
  const newJob = {
    _id: Date.now().toString(),
    ...req.body,
    postedDate: new Date().toISOString()
  };
  
  res.status(201).json(newJob);
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private/HR/Admin
router.put('/:id', (req, res) => {
  const job = mockJobs.find(j => j._id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  const updatedJob = {
    ...job,
    ...req.body
  };
  
  res.status(200).json(updatedJob);
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private/HR/Admin
router.delete('/:id', (req, res) => {
  const job = mockJobs.find(j => j._id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  res.status(200).json({ message: 'Job deleted successfully' });
});

// @route   POST /api/jobs/:id/match
// @desc    Match a resume to a job
// @access  Public
router.post('/:id/match', (req, res) => {
  const job = mockJobs.find(j => j._id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  // Simple matching algorithm
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ message: 'Resume text is required' });
  }
  
  const resumeWords = resumeText.toLowerCase().split(/\s+/);
  const matching = job.skills.filter(skill => 
    resumeWords.some(word => word.includes(skill.toLowerCase()))
  );
  
  const missing = job.skills.filter(skill => 
    !resumeWords.some(word => word.includes(skill.toLowerCase()))
  );
  
  const score = Math.round((matching.length / job.skills.length) * 100);
  
  res.status(200).json({
    job,
    matching,
    missing,
    score,
    assessment: score > 70 ? 'Good match' : 'Not a strong match'
  });
});

module.exports = router; 