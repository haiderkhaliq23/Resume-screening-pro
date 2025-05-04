const http = require('http');

console.log('Checking if the backend API is running...');

// Check backend health endpoint
const backendCheck = http.get('http://localhost:5000/api/health', (res) => {
  console.log(`Backend health check status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('✅ Backend API is running!');
      console.log('Health check response:', response);
      
      // Now check if jobs API is working
      checkJobsAPI();
    } catch (e) {
      console.error('❌ Error parsing backend health response:', e.message);
    }
  });
});

backendCheck.on('error', (err) => {
  console.error('❌ Cannot connect to backend server:');
  console.error(`Error: ${err.message}`);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure the backend server is running on port 5000');
  console.log('2. Run: cd backend && node server.js');
});

function checkJobsAPI() {
  console.log('\nChecking if the jobs API is working...');
  
  const jobsCheck = http.get('http://localhost:5000/api/jobs', (res) => {
    console.log(`Jobs API check status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jobs = JSON.parse(data);
        console.log('✅ Jobs API is working!');
        console.log(`Received ${jobs.length} jobs from the API`);
        console.log('\nYour application should now be working correctly.');
        console.log('If you still see "Failed to load jobs. Using mock data instead":');
        console.log('1. Check your browser console for any CORS or other errors');
        console.log('2. Make sure the frontend proxy is configured correctly in package.json');
        console.log('3. Try restarting both frontend and backend servers');
      } catch (e) {
        console.error('❌ Error parsing jobs API response:', e.message);
      }
    });
  });
  
  jobsCheck.on('error', (err) => {
    console.error('❌ Cannot connect to jobs API:');
    console.error(`Error: ${err.message}`);
  });
} 