const express = require('express');
const cors = require('cors');
// const connectDB = require('./config/db'); // Uncomment if your DB is connected here

// connectDB(); // Uncomment if your DB is connected here

const app = express();


// 1. Strict CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://adorixit.com",
    "https://www.adorixit.com",
    "https://dashboard.adorixit.com"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200 // Fixes legacy browser issues
};

// 2. Apply CORS middleware BEFORE any routes
app.use(cors(corsOptions));

// 3. (Optional) Explicitly handle OPTIONS if needed, but cors() usually covers it
// app.options('*', cors(corsOptions));

// 4. Body parser
app.use(express.json());

// 5. Routes
app.use('/api/contact', require('./routes/contact.routes'));
// app.use('/api/auth', require('./routes/auth.routes')); // Add your other routes here

module.exports = app;