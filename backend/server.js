require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for all requests (for development, you can restrict later)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from this origin
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
}));

// Enable parsing of JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
