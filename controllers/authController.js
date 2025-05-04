// Mock auth controller with file-based persistent storage
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Path to store mock user data
const mockDbPath = path.join(__dirname, '../mockdb');
const usersFilePath = path.join(mockDbPath, 'users.json');

// Ensure the mockdb directory exists
if (!fs.existsSync(mockDbPath)) {
  fs.mkdirSync(mockDbPath, { recursive: true });
}

// Initialize with mock users
const initMockUsers = [
  {
    _id: '1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'admin',
    company: 'Resume Screening Inc',
    title: 'Administrator'
  },
  {
    _id: '2',
    firstName: 'HR',
    lastName: 'Manager',
    email: 'hr@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'hr',
    company: 'Resume Screening Inc',
    title: 'HR Manager'
  },
  {
    _id: '3',
    firstName: 'John',
    lastName: 'Applicant',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'applicant',
    title: 'Software Developer'
  }
];

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production', {
    expiresIn: '30d'
  });
};

// Load users from file or initialize with mock data
const loadUsers = () => {
  try {
    if (fs.existsSync(usersFilePath)) {
      try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        return JSON.parse(data);
      } catch (jsonError) {
        console.error('Error parsing users JSON:', jsonError);
        // If JSON is invalid, overwrite with default users
        fs.writeFileSync(usersFilePath, JSON.stringify(initMockUsers, null, 2), 'utf8');
        return [...initMockUsers];
      }
    }
    // If file doesn't exist, initialize with mock users and save to file
    fs.writeFileSync(usersFilePath, JSON.stringify(initMockUsers, null, 2), 'utf8');
    return [...initMockUsers];
  } catch (error) {
    console.error('Error loading users:', error);
    return [...initMockUsers]; // Fallback to initial mock data
  }
};

// Save users to file
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log('Users saved successfully to:', usersFilePath);
    return true;
  } catch (error) {
    console.error('Error saving users:', error);
    return false;
  }
};

// Load users initially
let users = loadUsers();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    const { firstName, lastName, email, password, role, company, title } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user already exists
    const userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password, // In a real app, this would be hashed
      role: role || 'applicant',
      company,
      title,
      createdAt: new Date().toISOString()
    };
    
    // Add to mock database
    users.push(newUser);
    
    // Save to file
    saveUsers(users);
    console.log('New user registered:', newUser.firstName, newUser.lastName);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      ...userWithoutPassword,
      token: generateToken(newUser._id)
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Reload users from file to ensure we have the latest data
    users = loadUsers();
    
    // Find user by email (case insensitive)
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    console.log('User found:', user ? 'Yes' : 'No');
    
    // Simple password check
    if (user && user.password === password) {
      console.log('Login successful for user:', user.firstName);
      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        ...userWithoutPassword,
        token: generateToken(user._id)
      });
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // Reload users to get fresh data
    users = loadUsers();
    
    // Find user by ID provided in the JWT
    const user = users.find(user => user._id === req.user._id);

    if (user) {
      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile }; 