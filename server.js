const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dns = require('dns');

// Configure DNS servers to use Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Check if .env file exists, if not create it
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file with default configuration...');
  const defaultEnv = 
`PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/resumeScreeningDB
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development`;
  
  fs.writeFileSync(envPath, defaultEnv);
  console.log('.env file created successfully');
}

// Load environment variables
dotenv.config({ path: envPath });

const connectDB = require('./config/db');

// Connect to database
const dbConnected = connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/candidates', require('./routes/candidates'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// For debugging: show the MongoDB URI that's being used (masked for security)
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeScreeningDB';
console.log(`MongoDB URI is configured: ${mongoURI.substring(0, 20)}...`);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbConnected: dbConnected,
    time: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 