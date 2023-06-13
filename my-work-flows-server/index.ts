import express, { Express } from 'express';

import workflowRouter from './routes/workflow'
import taskRouter from './routes/task'
import authRouter from './routes/auth'

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { authenticateUser } from './middleware/authentication';
import { getSessionHandler } from './middleware/session';

const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

const app: Express = express();

// const domainsFromEnv = process.env.CORS_DOMAINS || ""

// const whitelist = domainsFromEnv.split(",").map(item => item.trim())

// const corsOptions = {
//   origin: function (origin: string, callback: Function) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  // allowedHeaders: [
  //   'authorization',
  //   'Content-Type'
  // ],
  // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

// app.options('*', cors());
app.use(cors());
app.use(express.json());

app.use(getSessionHandler());

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
