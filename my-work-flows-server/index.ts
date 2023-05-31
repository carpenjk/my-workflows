import express, { Express } from 'express';
import workflowRouter from './routes/workflow'
import taskRouter from './routes/task'
import authRouter from './routes/auth'

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { authenticateUser } from './middleware/authentication';
require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api/v1/workflow', authenticateUser, workflowRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workflow/:workflowID/task', authenticateUser, taskRouter);

app.use(notFoundHandler);
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}.`);
  });
} catch (error) {
  console.log(error);
}
