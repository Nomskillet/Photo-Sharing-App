const jwt = require('jsonwebtoken');

// Debugging
console.log('JWT_SECRET at middleware load:', process.env.JWT_SECRET);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        console.log('Verifying Token:', token); // Debugging log for token being verified
        console.log('JWT_SECRET at verification:', process.env.JWT_SECRET); // Debugging log for secret

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        console.log('Token decoded successfully:', decoded); // Log decoded token

        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('Invalid token:', err.message);
        res.status(403).json({ error: 'Invalid token signature.' });
    }
};

module.exports = authenticateToken;
