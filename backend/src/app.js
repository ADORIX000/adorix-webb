const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const connectDB = require('./config/db'); // Uncomment if your DB is connected here

// connectDB(); // Uncomment if your DB is connected here

const app = express();

// Apply secure HTTP headers for API responses.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), usb=(), accelerometer=(), gyroscope=()'
  );
  next();
});


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
app.use(express.urlencoded({ extended: true })); // Required for PayHere webhook compatibility

// 5. Routes
app.use('/api/contact', require('./routes/contact.routes'));
app.use('/api/payments', require('./routes/payment.route'));
// app.use('/api/auth', require('./routes/auth.routes')); // Add your other routes here

module.exports = app;