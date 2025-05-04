const { exec } = require('child_process');
const net = require('net');

// Check if MongoDB process is running
console.log('Checking if MongoDB is running...');

// First try to connect to MongoDB port
const client = net.createConnection({ port: 27017 }, () => {
  console.log('✅ MongoDB is running! Connection to port 27017 successful.');
  console.log('\nYou can now run your application with:');
  console.log('1. node run-backend.js (in one terminal)');
  console.log('2. cd frontend && npm start (in another terminal)');
  client.end();
});

client.on('error', (err) => {
  console.log('❌ Cannot connect to MongoDB on port 27017.');
  console.log('Error details:', err.message);
  
  // Check if MongoDB is installed
  exec('mongod --version', (error, stdout, stderr) => {
    if (error) {
      console.log('\n❌ MongoDB is not installed or not in your PATH.');
      console.log('Please follow the instructions in MONGODB_INSTALLATION_GUIDE.md');
      console.log('You can download MongoDB from: https://www.mongodb.com/try/download/community');
      return;
    }
    
    console.log('\n✅ MongoDB is installed:', stdout.split('\n')[0]);
    console.log('But the MongoDB server is not running.');
    console.log('\nTo start MongoDB, run one of these commands:');
    console.log('1. mongod (in a separate terminal)');
    console.log('2. node start-mongodb.js');
    console.log('\nOr check if the MongoDB service is enabled in Windows Services.');
  });
});

// Set a timeout in case connection attempt hangs
client.setTimeout(3000, () => {
  console.log('Connection attempt timed out.');
  client.destroy();
}); 