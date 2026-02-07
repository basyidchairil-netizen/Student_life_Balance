const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

app.use(cors()); 
app.use(express.json());

// Load environment variables
dotenv.config();

// Import logger
const logger = require('./logger');

// Import database connection
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();
// 1. Import Routes
const authRoutes = require('./routes/authRoutes');

// 2. Gunakan Routes
app.use('/api/auth', authRoutes);

// 3. Jalankan Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});

// Import routes
const userRoutes = require('./routes/user');
const scheduleRoutes = require('./routes/schedule');
const financeRoutes = require('./routes/finance');
const healthRoutes = require('./routes/health');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/health', healthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
