const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Monitor = sequelize.define('Monitor', {
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
    tableName: 'monitors',
    timestamps: true
});

module.exports = Monitor;