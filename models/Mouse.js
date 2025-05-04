const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mouse = sequelize.define('Mouse', {
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
    tableName: 'mouses',
    timestamps: true
});

module.exports = Mouse;