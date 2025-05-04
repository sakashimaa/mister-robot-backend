const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const New = sequelize.define('New', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'news',
    timestamps: true,
});

module.exports = New;