const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Path to mock user database
const usersFilePath = path.join(__dirname, '../mockdb/users.json');

// Function to load users from file
const loadUsers = () => {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading users in middleware:', error);
    return [];
  }
};

// Protect routes - middleware to check if user is authenticated
const protect = (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'Not authorized, no token' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production');
      
      // Get user from token
      const users = loadUsers();
      const user = users.find(u => u._id === decoded.id);
      
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      
      // Add user to request object (without password)
      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// Admin only middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as admin' });
  }
};

// HR or Admin middleware
const hrOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'hr' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as HR or admin' });
  }
};

module.exports = { protect, admin, hrOrAdmin }; 