const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number
  },
  content: {
    type: String
  },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    education: [{
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date
    }],
    experience: [{
      company: String,
      title: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    skills: [String],
    languages: [String],
    certifications: [String]
  },
  score: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['uploaded', 'parsed', 'scored', 'matched'],
    default: 'uploaded'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume; 