# Student Life-Balance & Healthy Lifestyle API

A robust RESTful API for the Student Life-Balance & Healthy Lifestyle web application.

## Features

- **User Authentication**: Secure signup and login with JWT and bcrypt
- **Profile Management**: Update user details and skincare routine
- **Schedule Management**: Class schedules, study sessions, and sleep logs
- **Financial Tracking**: Expenses, budget limits, and savings goals
- **Health Monitoring**: Water intake, acne status, and meal logs
- **Smart Recommendations**: Acne-safe foods and schedule optimization

## Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **CORS** for cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file based on `.env.example`
5. Start the server: `npm start` or `npm run dev` for development

### Environment Variables

Create a `.env` file in the backend directory:

```
MONGO_URI=mongodb://localhost:27017/student-life-balance
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Schedule Management
- `GET /api/schedule` - Get user schedule
- `POST /api/schedule/class` - Add class
- `POST /api/schedule/study` - Add study session
- `POST /api/schedule/sleep` - Add sleep log
- `POST /api/schedule/sync` - Sync schedule and check conflicts

### Finance Management
- `GET /api/finance` - Get finance data
- `POST /api/finance/expense` - Add expense
- `PUT /api/finance/allowance` - Update allowance
- `GET /api/finance/daily-limit` - Get daily budget limit
- `POST /api/finance/savings-goal` - Add savings goal
- `PUT /api/finance/savings/:goalId` - Update savings

### Health Management
- `GET /api/health` - Get health data
- `POST /api/health/water` - Add water intake
- `POST /api/health/acne` - Add acne status
- `POST /api/health/meal` - Add meal log
- `GET /api/health/recommendations` - Get food recommendations

## Project Structure

```
backend/
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── server.js        # Main server file
├── package.json     # Dependencies
├── .env.example     # Environment variables template
└── README.md        # This file
```

## Usage with Frontend

The API is designed to work seamlessly with the Tailwind-based frontend. Make sure to:

1. Set the API base URL in your frontend to match the backend server
2. Include JWT tokens in Authorization headers for protected routes
3. Handle CORS properly (already configured in the backend)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
