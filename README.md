# Resume Screening Application

This is a MERN (MongoDB, Express, React, Node.js) stack application for resume screening and job posting.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or newer)

## Installation

### Automatic Installation

Run the installation script to set up everything automatically:

```bash
node install.js
```

This script will:
1. Create necessary directories
2. Set up environment variables
3. Install backend dependencies
4. Install frontend dependencies

### Manual Installation

If you prefer to install everything manually:

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resumeScreeningDB
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   NODE_ENV=development
   ```

## Running the Application

### Using the Start Script

The easiest way to run the application is to use the start script, which will start MongoDB, the backend, and the frontend simultaneously:

```bash
node start.js
```

### Manual Startup

1. Start MongoDB (if not running as a service):
   ```bash
   mongod --dbpath=./data/db
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## Using the Application

The application consists of the following main components:

1. **User Authentication:**
   - Register and login functionality
   - Different roles: HR, Applicant

2. **HR Dashboard:**
   - Post new job listings
   - View posted jobs
   - Analyze application statistics

3. **Job Listings:**
   - View all available jobs
   - Filter jobs by title, skills, location, etc.
   - Apply for jobs

4. **Resume Screening:**
   - Upload resumes in PDF or DOCX format
   - Extract text content from resumes
   - Match resume content with job requirements
   - Score candidates based on matching criteria

5. **Candidate Scoring:**
   - Evaluate candidates against job requirements
   - Generate match scores and recommendations

## Troubleshooting

### API Connection Issues

If you're seeing "Failed to load jobs. Using mock data instead." error:

1. Make sure MongoDB is running
2. Check that the backend server is running (should be on port 5000)
3. Verify the `.env` file in the backend directory has the correct MongoDB URI
4. Restart both the backend and frontend servers

### MongoDB Connection Issues

If MongoDB fails to connect:

1. Verify MongoDB is installed and running
   - Run `node check-mongodb.js` to check MongoDB connection status
   - If MongoDB is not installed, follow the instructions in `MONGODB_INSTALLATION_GUIDE.md`
   - For Windows users, check if the MongoDB service is running in Windows Services
2. Check that the MongoDB URI in the `.env` file is correct (default: `mongodb://localhost:27017/resumeScreeningDB`)
3. Ensure that the MongoDB port (default: 27017) is not blocked by a firewall
4. Try starting MongoDB manually:
   - Run `mongod` in a separate terminal
   - Or run `node start-mongodb.js`
5. Check MongoDB data directory:
   - Ensure the `/data/db` directory exists
   - Make sure your user has write permissions to this directory

### Other Issues

For other issues, check the console logs in both the backend and frontend terminal windows for specific error messages.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 