require('dotenv').config(); // Load .env variables at the very beginning

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Import Sequelize instance
const photoRoutes = require('./photoRoutes'); // Import the routes
const authRoutes = require('./authRoutes'); // Import the new auth routes
const authMiddleware = require('./authMiddleware'); // Import authMiddleware

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test Database Connection
sequelize
    .authenticate()
    .then(() => console.log('Database connection established successfully'))
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit if the database connection fails
    });

// Optional: Synchronize database
sequelize
    .sync({ alter: true }) // Adjust tables to match models (optional for development)
    .then(() => console.log('Database synchronized successfully'))
    .catch((error) => {
        console.error('Database synchronization failed:', error);
        process.exit(1); // Exit if synchronization fails
    });

// Routes
app.use('/api/auth', authRoutes); // Public auth routes (register, login)
app.use('/api/photos', authMiddleware, photoRoutes); // Protected photo routes

// Debugging: Log all routes for confirmation
app._router.stack.forEach((r) => {
    if (r.route) {
        console.log(`Route: ${r.route.path}`);
    } else if (r.name === 'router') {
        r.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log(`Sub-route: ${handler.route.path}`);
            }
        });
    }
});

// Root route
app.get('/', (req, res) => {
    console.log('Root route hit');
    res.send('Welcome to the Photo Sharing App API');
});

// Serve uploads folder
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
