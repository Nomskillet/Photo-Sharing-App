const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user info to the request
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('Invalid token:', err);
        res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
