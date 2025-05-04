const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Setting up MongoDB connection...');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data', 'db');
if (!fs.existsSync(dataDir)) {
  console.log('Creating MongoDB data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('MongoDB data directory created.');
}

// Check if MongoDB is installed
console.log('Checking if MongoDB is installed...');
exec('mongod --version', (error, stdout, stderr) => {
  if (error) {
    console.error('MongoDB is not installed or not in the PATH. Please install MongoDB to continue.');
    console.error('You can download it from https://www.mongodb.com/try/download/community');
    console.error('Error details:', error);
    return;
  }

  console.log('MongoDB is installed:', stdout.split('\n')[0]);
  
  // Start MongoDB
  console.log('Starting MongoDB server...');
  console.log('Using data directory:', dataDir);
  
  const mongod = spawn('mongod', ['--dbpath', dataDir], { stdio: 'inherit' });
  
  mongod.on('error', (error) => {
    console.error('Failed to start MongoDB:', error);
    console.log('Alternative approach:');
    console.log('1. Open a new command prompt');
    console.log(`2. Run this command: mongod --dbpath="${dataDir}"`);
  });
  
  console.log('MongoDB server running. Press Ctrl+C to stop.');
  
  // Handle shutdown
  process.on('SIGINT', () => {
    console.log('Stopping MongoDB server...');
    mongod.kill();
    process.exit();
  });
}); 