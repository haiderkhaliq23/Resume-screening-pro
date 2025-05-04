# MongoDB Installation Guide for Windows

## Step 1: Download MongoDB
1. Go to [MongoDB Community Edition download page](https://www.mongodb.com/try/download/community)
2. Select the following options:
   - Version: Latest version
   - Platform: Windows
   - Package: MSI
3. Click "Download" button

## Step 2: Install MongoDB
1. Run the downloaded MSI file
2. Choose "Complete" installation type
3. Make sure "Install MongoDB Compass" is checked (this is a GUI for MongoDB)
4. Complete the installation by following the installer prompts

## Step 3: Verify Installation
1. Open Command Prompt (cmd) as Administrator
2. Run: `mongod --version`
3. If MongoDB is installed correctly, you should see version information

## Step 4: Set Up Data Directory
1. Create a folder at `C:\data\db` (the default data directory for MongoDB)
   ```
   mkdir C:\data\db
   ```

## Step 5: Run MongoDB
1. Open Command Prompt (cmd) as Administrator
2. Start MongoDB server:
   ```
   mongod
   ```
3. If everything is set up correctly, MongoDB server will start running on port 27017

## Step 6: Verify MongoDB Connection
1. Open another Command Prompt window
2. Connect to MongoDB:
   ```
   mongo
   ```
3. If connected successfully, you'll see the MongoDB shell

## Step 7: Update Your Application
1. After MongoDB is running, restart your application
2. The "Failed to load jobs" error should be resolved

## Troubleshooting
- Make sure MongoDB services are running
- Check Windows Services (search "services" in Start menu)
- Look for "MongoDB Server" and make sure it's running
- If not, right-click and select "Start"

## Alternative: Using the Application Scripts
After installing MongoDB, you can also use the application's scripts:
```
node start-mongodb.js
node run-backend.js
```
In a separate terminal:
```
cd frontend
npm start
``` 