const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('photo_sharing_app', 'root', 'Atlas', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Attempt to connect to the database
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close(); // Close the connection
    }
};

testConnection();
