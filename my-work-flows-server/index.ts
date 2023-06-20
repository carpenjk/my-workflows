
import express, { Express } from 'express';
import workflowRouter from './routes/workflow'
import taskRouter from './routes/task'
import authRouter from './routes/auth'

import {passport} from './middleware/passport';
import {isAuthenticated} from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { sessionHandler } from './middleware/session';

import {sequelize} from './adapters/sequelize'
const session =require('express-session');

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

export const sequelizeStore =  new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 100
})



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
app.use(express.urlencoded({
  extended: true 
  })
);
app.use(express.json());
app.use(session({
  secret: "keyboard cat",
  store: sequelizeStore,
  saveUninitialized: true,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/workflow', isAuthenticated, workflowRouter);
app.use('/api/v1/workflow/:workflowID/task', isAuthenticated, taskRouter);

app.use(notFoundHandler);
app.use(errorHandler);

try {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}.`);
  });
} catch (error) {
  console.log(error);
}
