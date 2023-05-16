"use strict";
const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.database, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'mysql'
});
module.exports = sequelize;
