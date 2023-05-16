"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const sequelize = require('../adapters/sequelize');
class Users extends sequelize_1.Model {
}
exports.Users = Users;
Users.init({
    id: {
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
        }
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'User'
});
