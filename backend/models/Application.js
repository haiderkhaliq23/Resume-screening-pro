const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['applied', 'reviewing', 'interview', 'offered', 'rejected', 'withdrawn'],
    default: 'applied'
  },
  notes: {
    type: String
  },
  score: {
    type: Number
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application; 