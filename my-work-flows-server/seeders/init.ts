import { Task } from '../models/Task';
import { User } from '../models/User'
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development'

const init = async () => {
  async function user() {
    await User.sync({ force: isDev });
    await User.bulkCreate([
      { name: 'Guest One', email: 'guest1@example.com', createdAt: new Date() },
      { name: 'Guest Two', email: 'guest2@example.com', createdAt: new Date() }
    ]);
  }

  async function task() {
    await Task.sync({ force: isDev });
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
        dependencies: [BigInt(1)],
        workflowID: BigInt(1),

      },
      {
        name: 'task 3',
        description: 'task 3 description',
        owner: BigInt(1),
        reviewer: BigInt(2),
        dueDate: new Date('2023-05-30T17:00:00'),
        dependencies: [BigInt(1), BigInt(2)],
        workflowID: BigInt(1),
      }
    ]);

  }
  const promises = [user(), task()];
  await Promise.all(promises);
}

init();

export default init 