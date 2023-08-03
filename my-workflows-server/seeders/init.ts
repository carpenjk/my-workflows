import bcrypt from 'bcrypt'
import { Task } from '../models/Task';
import { User } from '../models/User'
import { Workflow } from '../models/Workflow';
import { sequelize } from '../adapters/sequelize'
import { Dependency } from '../models/Dependency';
import {sequelizeStore } from '../middleware/session';

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development'

const init = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  await sequelize.sync({ force: isDev });
  await sequelizeStore.sync({force: isDev})
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

  await User.bulkCreate([
    { name: 'Guest One', email: 'guest1@example.com', password: '1Pa$$word', createdAt: new Date() },
    { name: 'Guest Two', email: 'guest2@example.com', password: '1Pa$$word', createdAt: new Date() }
  ]);

  await Workflow.bulkCreate([
    {
      name: 'Month End Close',
      description: 'Month End Close',
      status: 'Published',
      duration: '7 Days',
      owner: BigInt(1),
      // createdAt: new Date(),
    },
    {
      name: 'Year End Close',
      description: 'Year End Close',
      status: 'Published',
      duration: '14 Days',
      owner: BigInt(2),
      // createdAt: new Date(),
    }, {
      name: 'Quarterly Forecast',
      description: 'Quarterly Forecast',
      status: 'Draft',
      duration: '7 Days',
      owner: BigInt(2),
      // createdAt: new Date(),
    }, {
      name: 'Yearly Budget Process',
      description: 'Yearly Budget Process',
      status: 'Published',
      duration: '20 Days',
      owner: BigInt(2),
      // createdAt: new Date(),
    },
  ]);

  await Task.bulkCreate([
    {
      name: 'task 1',
      description: 'task 1 description',
      owner: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 1,
      workflowID: BigInt(1),
    },
    {
      name: 'task 2',
      description: 'task 2 description',
      owner: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 1,
      workflowID: BigInt(1),

    },
    {
      name: 'task 3',
      description: 'task 3 description',
      owner: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 1,
      workflowID: BigInt(1),
    }
  ]);

  // await Dependency.bulkCreate([
  //   { taskID: BigInt(2), dependency: BigInt(1) },
  //   { taskID: BigInt(3), dependency: BigInt(1) },
  //   { taskID: BigInt(3), dependency: BigInt(2) }
  // ])

}

init();

export default init 