import { Sequelize } from "sequelize";
require('dotenv').config();

export const sequelize = new Sequelize(process.env.database as string, process.env.SQL_USER as string, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOST,
  dialect: 'mysql'
});