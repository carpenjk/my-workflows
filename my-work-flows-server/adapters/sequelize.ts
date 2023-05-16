const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.database as string, process.env.SQL_USER as string, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOST,
  dialect: 'mysql'
});
module.exports = sequelize;