"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeStore = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const workflow_1 = __importDefault(require("./routes/workflow"));
const task_1 = __importDefault(require("./routes/task"));
const user_1 = __importDefault(require("./routes/user"));
const passport_1 = require("./middleware/passport");
const auth_1 = require("./middleware/auth");
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
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    // allowedHeaders: [
    //   // 'authorization',
    //   'Content-Type'
    // ],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
};
app.use(cors(corsOptions));
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
        // secure: process.env.NODE_ENV === 'production' ? true : false,
        secure: true,
        sameSite: 'none',
        // httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        maxAge: 1000 * 90 // test 1.5 minutes
    }
}));
app.use(passport_1.passport.initialize());
app.use(passport_1.passport.session());
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/workflow', auth_1.isAuthenticated, workflow_1.default);
app.use('/api/v1/workflow/:workflowID/task', auth_1.isAuthenticated, task_1.default);
app.use(notFoundHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
try {
    const key = fs_1.default.readFileSync(process.env.SSL_KEY);
    const cert = fs_1.default.readFileSync(process.env.SSL_CERT);
    const options = {
        rejectUnauthorized: false,
        requestCert: false,
        key: key,
        cert: cert,
    };
    https_1.default.createServer(options, app).listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}.`);
    });
}
catch (error) {
    console.log(error);
}
