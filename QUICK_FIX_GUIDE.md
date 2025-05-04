# Quick Fix Guide: MongoDB Connection Issue

## Current Problem
The application is showing: **"Failed to load jobs. Using mock data instead."**

This is happening because:
1. MongoDB is not installed on your system, or
2. MongoDB is not running, or
3. The connection to MongoDB is being blocked

## How to Fix It

### Step 1: Install MongoDB
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Select Windows MSI package and install with default options
3. Make sure to install MongoDB Compass (GUI) when prompted

### Step 2: Verify Installation
After installing MongoDB:
1. Open a new Command Prompt as Administrator
2. Run: `mongod --version`
3. You should see MongoDB version information

### Step 3: Start MongoDB
Option 1: Using Windows Services
1. Search for "Services" in Windows start menu
2. Look for "MongoDB Server" in the list
3. Right-click and select "Start"

Option 2: Manual Start
1. Open Command Prompt as Administrator
2. Run: `mongod`
3. Keep this window open while using the application

Option 3: Using our scripts
1. Run: `node start-mongodb.js`
2. Keep this window open while using the application

### Step 4: Start the Application
After MongoDB is running:
1. In a new terminal window, start the backend:
   ```
   node run-backend.js
   ```
2. In another terminal window, start the frontend:
   ```
   cd frontend
   npm start
   ```

### Step 5: Verify Connection
To confirm that MongoDB is working:
1. Run: `node check-mongodb.js`
2. You should see: "✅ MongoDB is running! Connection to port 27017 successful."

## Need More Help?
See the detailed installation steps in `MONGODB_INSTALLATION_GUIDE.md`

## Using the Application Without MongoDB
If you prefer to just use the application with mock data:
1. The application automatically falls back to mock data
2. You can browse, search, and interact with the sample job postings 
3. Note that any changes you make will not be saved permanently 