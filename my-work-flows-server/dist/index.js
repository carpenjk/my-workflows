"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeStore = void 0;
const express_1 = __importDefault(require("express"));
const workflow_1 = __importDefault(require("./routes/workflow"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const passport_1 = require("./middleware/passport");
const auth_2 = require("./middleware/auth");
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const sequelize_1 = require("./adapters/sequelize");
const session = require('express-session');
// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
exports.sequelizeStore = new SequelizeStore({
    db: sequelize_1.sequelize,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 100
});
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const app = (0, express_1.default)();
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
};
// app.options('*', cors());
app.use(cors());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use(session({
    secret: "keyboard cat",
    store: exports.sequelizeStore,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/workflow', auth_2.isAuthenticated, workflow_1.default);
app.use('/api/v1/workflow/:workflowID/task', auth_2.isAuthenticated, task_1.default);
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
try {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}.`);
    });
}
catch (error) {
    console.log(error);
}
