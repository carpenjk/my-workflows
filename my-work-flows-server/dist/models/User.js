"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require('../adapters/sequelize');
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    userID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        validate: {
            min: 2,
            max: 50,
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'User'
});
