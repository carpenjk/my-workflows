import { Users } from '../models/Users'
require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development'

const init = async () => {
  await Users.sync({ force: isDev });
  const result = await Users.bulkCreate([
    { name: 'Guest One', email: 'guest1@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
    { name: 'Guest Two', email: 'guest2@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() }
  ]);
  console.log("🚀 ~ file: init.ts:10 ~ dbInit ~ result:", result)
}

init();

export default init 