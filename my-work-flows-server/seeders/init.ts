import bcrypt from 'bcrypt'
import { Task } from '../models/Task';
import { User } from '../models/User'
import { Workflow } from '../models/Workflow';
import { sequelize } from '../adapters/sequelize'
import { Dependency } from '../models/Dependency';

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development'

const init = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  await sequelize.sync({ force: isDev });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

  await User.bulkCreate([
    { name: 'Guest One', email: 'guest1@example.com', password: 'password', createdAt: new Date() },
    { name: 'Guest Two', email: 'guest2@example.com', password: 'password', createdAt: new Date() }
  ]);

  await Workflow.bulkCreate([
    { name: 'Workflow 1', description: 'This is Workflow 1' }
  ]);

  await Task.bulkCreate([
    {
      name: 'task 1',
      description: 'task 1 description',
      owner: BigInt(1),
      reviewer: BigInt(2),
      dueDate: new Date('2023-05-30T17:00:00'),
      startDate: new Date(),
      workflowID: BigInt(1),
    },
    {
      name: 'task 2',
      description: 'task 2 description',
      owner: BigInt(1),
      reviewer: BigInt(2),
      dueDate: new Date('2023-05-30T17:00:00'),
      workflowID: BigInt(1),

    },
    {
      name: 'task 3',
      description: 'task 3 description',
      owner: BigInt(1),
      reviewer: BigInt(2),
      dueDate: new Date('2023-05-30T17:00:00'),
      workflowID: BigInt(1),
    }
  ]);

  await Dependency.bulkCreate([
    { taskID: BigInt(2), dependency: BigInt(1) },
    { taskID: BigInt(3), dependency: BigInt(1) },
    { taskID: BigInt(3), dependency: BigInt(2) }
  ])

}

init();

export default init 