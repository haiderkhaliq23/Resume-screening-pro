const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if .env file exists in backend directory, if not create it
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file in backend directory...');
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumeScreeningDB
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development`;
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
} else {
  console.log('.env file already exists in backend directory.');
}

console.log('Starting Backend Server...');
const backendProcess = spawn('node', ['server.js'], { 
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit' 
});

console.log('Backend server running. Press Ctrl+C to stop.');

// Handle application shutdown
process.on('SIGINT', () => {
  console.log('Stopping backend server...');
  process.exit();
}); 