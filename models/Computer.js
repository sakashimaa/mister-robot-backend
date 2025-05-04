const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Computer = sequelize.define('Computer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fpsQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isWorking: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'computers',
    timestamps: true
});

module.exports = Computer;