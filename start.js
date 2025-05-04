const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if MongoDB is installed
console.log('Checking if MongoDB is installed...');
const checkMongoDB = spawn('mongod', ['--version']);

checkMongoDB.on('error', (error) => {
  console.error('MongoDB is not installed or not in PATH. Please install MongoDB to use this application.');
  console.error('You can download it from https://www.mongodb.com/try/download/community');
  process.exit(1);
});

checkMongoDB.stdout.on('data', (data) => {
  console.log('MongoDB is installed: ', data.toString().split('\n')[0]);
  startApplication();
});

function startApplication() {
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

  // Start MongoDB
  console.log('Starting MongoDB...');
  const mongod = spawn('mongod', ['--dbpath', path.join(__dirname, 'data', 'db')]);
  
  mongod.stderr.on('data', (data) => {
    if (data.toString().includes('data directory not found')) {
      console.log('Creating MongoDB data directory...');
      fs.mkdirSync(path.join(__dirname, 'data', 'db'), { recursive: true });
      console.log('MongoDB data directory created. Restarting MongoDB...');
      mongod.kill();
      startApplication();
      return;
    }
    console.error(`MongoDB error: ${data}`);
  });

  mongod.stdout.on('data', (data) => {
    if (data.toString().includes('Waiting for connections')) {
      console.log('MongoDB started successfully!');
      startBackendServer();
    }
  });

  // Start Backend Server
  function startBackendServer() {
    console.log('Starting Backend Server...');
    const backendProcess = spawn('node', ['server.js'], { cwd: path.join(__dirname, 'backend') });

    backendProcess.stdout.on('data', (data) => {
      console.log(`Backend: ${data}`);
      if (data.toString().includes('Server running on port')) {
        startFrontendServer();
      }
    });

    backendProcess.stderr.on('data', (data) => {
      console.error(`Backend Error: ${data}`);
    });
  }

  // Start Frontend Server
  function startFrontendServer() {
    console.log('Starting Frontend Server...');
    const frontendProcess = spawn('npm', ['start'], { cwd: path.join(__dirname, 'frontend') });

    frontendProcess.stdout.on('data', (data) => {
      console.log(`Frontend: ${data}`);
    });

    frontendProcess.stderr.on('data', (data) => {
      console.error(`Frontend Error: ${data}`);
    });
  }
}

// Handle application shutdown
process.on('SIGINT', () => {
  console.log('Stopping all processes...');
  process.exit();
}); 