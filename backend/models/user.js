module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false, // Required field
            unique: true, // Must be unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Required field
        },
    });

    return User;
};
