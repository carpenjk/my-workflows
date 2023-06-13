import {sequelize} from '../adapters/sequelize'
const session =require('express-session');

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

export const sequelizeStore =  new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 100
})

export const getSessionHandler = () => session({
      secret: "keyboard cat",
      store: sequelizeStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
      cookie: { secure: process.env.NODE_ENV === 'production' ? true : false }
    })