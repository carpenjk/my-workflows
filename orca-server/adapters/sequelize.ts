import { Sequelize } from "sequelize-typescript";
import { Workflow } from "../models/Workflow";
import { Dependency } from "../models/Dependency";
import { Task } from "../models/Task";
import { User } from "../models/User";
require('dotenv').config();

export const sequelize = new Sequelize({
  host: process.env.SQL_HOST,
  dialect: 'mysql',
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.database,
  logging: true,
  models: [Dependency, Task, User, Workflow ],
});