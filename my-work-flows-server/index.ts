import express, { Express } from 'express';
const workflows = require('./routes/workflows');
const tasks = require('./routes/tasks');
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/v1/workflow', workflows);
app.use('/api/v1/workflow/:id/task', tasks);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}.`);
});