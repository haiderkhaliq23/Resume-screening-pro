const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the environment variable or a fallback connection string
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resumeScreeningDB';
    
    console.log(`Attempting to connect to MongoDB at: ${mongoURI.split('/').slice(0, 3).join('/')}/***`);
    
    const conn = await mongoose.connect(mongoURI, {
      // Connection options for Mongoose 6+ compatibility
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // Provide more helpful error messages based on common error types
    if (error.name === 'MongoServerSelectionError') {
      console.error('Unable to connect to MongoDB server. Make sure MongoDB is running.');
      console.error('Try running "mongod" in a separate terminal window.');
    }
    
    // Don't exit the process, allow the app to continue with mock data
    console.error('Continuing with mock data...');
    return false;
  }
};

module.exports = connectDB; 