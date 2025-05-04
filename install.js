const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting installation process...');

// Create data directories if they don't exist
console.log('Creating data directories...');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(path.join(__dirname, 'data', 'db'))) {
  fs.mkdirSync(path.join(__dirname, 'data', 'db'));
}
console.log('Data directories created successfully.');

// Create uploads directory if it doesn't exist
console.log('Creating uploads directory...');
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}
console.log('Uploads directory created successfully.');

// Check if .env file exists in backend directory, if not create it
console.log('Checking backend .env file...');
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

// Install backend dependencies
console.log('Installing backend dependencies...');
const backendInstall = spawn('npm', ['install'], { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });

backendInstall.on('close', (code) => {
  if (code !== 0) {
    console.error('Failed to install backend dependencies');
    process.exit(1);
  }
  console.log('Backend dependencies installed successfully!');
  
  // Install frontend dependencies
  console.log('Installing frontend dependencies...');
  const frontendInstall = spawn('npm', ['install'], { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  
  frontendInstall.on('close', (code) => {
    if (code !== 0) {
      console.error('Failed to install frontend dependencies');
      process.exit(1);
    }
    console.log('Frontend dependencies installed successfully!');
    
    // Installation complete
    console.log('\n=== Installation Complete ===');
    console.log('To start the application:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Run "node start.js" from the project root');
    console.log('3. Or start the servers separately:');
    console.log('   - Backend: cd backend && npm start');
    console.log('   - Frontend: cd frontend && npm start');
  });
}); 