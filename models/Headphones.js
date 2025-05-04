const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Headphones = sequelize.define('Keyboard', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availability: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'headphones',
    timestamps: true
});

module.exports = Headphones;