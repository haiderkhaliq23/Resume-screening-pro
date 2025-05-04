# Resume Screening Application

A MERN (MongoDB, Express, React, Node.js) stack application for resume screening and candidate management.

## Features

- User authentication (Applicants, HR, Admin)
- Resume uploading and parsing
- Job posting and application
- Candidate searching and scoring
- Dashboard analytics

## Project Structure

```
├── backend/             # Express.js server
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables
│   ├── package.json     # Backend dependencies
│   └── server.js        # Server entry point
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/             # React source code
│   └── package.json     # Frontend dependencies
├── uploads/             # Uploaded resumes
├── package.json         # Root dependencies and scripts
└── README.md            # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/resume-screening.git
   cd resume-screening
   ```

2. Install dependencies
   ```
   npm run install-all
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory with:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Run the application
   ```
   npm run dev
   ```

## Usage

- Backend API will run on http://localhost:5000
- Frontend will run on http://localhost:3000

## License

This project is licensed under the MIT License.
