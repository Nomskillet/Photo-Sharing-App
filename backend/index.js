const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const photoRoutes = require('./photoRoutes'); // Import the routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', photoRoutes);

// Root route
app.get('/', (req, res) => {
    console.log('Root route hit'); // Add this line
    res.send('Welcome to the Photo Sharing App API');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/uploads', express.static('uploads'));

