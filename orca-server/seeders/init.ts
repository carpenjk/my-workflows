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
      ownerID: BigInt(1),
      // createdAt: new Date(),
    },
    {
      name: 'Year End Close',
      description: 'Year End Close',
      status: 'Published',
      duration: '14 Days',
      ownerID: BigInt(2),
      // createdAt: new Date(),
    }, {
      name: 'Quarterly Forecast',
      description: 'Quarterly Forecast',
      status: 'Draft',
      duration: '7 Days',
      ownerID: BigInt(2),
      // createdAt: new Date(),
    }, {
      name: 'Yearly Budget Process',
      description: 'Yearly Budget Process',
      status: 'Published',
      duration: '20 Days',
      ownerID: BigInt(2),
      // createdAt: new Date(),
    },
  ]);

  await Task.bulkCreate([
    {
      name: 'Close ERP',
      description: 'Close ERP System',
      ownerID: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 1,
      workflowID: BigInt(1),
    },
    {
      name: 'Run Validation Reports',
      description: 'Run Trial Balance and Other Validations',
      ownerID: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 1,
      workflowID: BigInt(1),

    },
    {
      name: 'Topside Adjustments',
      description: 'Topside Adjustment Entries',
      ownerID: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 2,
      workflowID: BigInt(1),
    },
    {
      name: 'Run Data Loads',
      description: 'Load data into Reporting Systems',
      ownerID: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 2,
      workflowID: BigInt(1),
    },
    {
      name: 'Run Data Validations',
      description: 'Run Data Validation Reports',
      ownerID: BigInt(1),
      // reviewer: BigInt(2),
      dueDay: 2,
      workflowID: BigInt(1),
    }
  ]);

  await Dependency.bulkCreate([
    { taskID: BigInt(2), dependencies: BigInt(1) },
    { taskID: BigInt(3), dependencies: BigInt(1) },
    { taskID: BigInt(3), dependencies: BigInt(2) }
  ])

}

init();

export default init 