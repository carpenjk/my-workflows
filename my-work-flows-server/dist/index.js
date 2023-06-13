"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workflow_1 = __importDefault(require("./routes/workflow"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const authentication_1 = require("./middleware/authentication");
const session_1 = require("./middleware/session");
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
app.use(express_1.default.json());
app.use((0, session_1.getSessionHandler)());
app.use('/api/v1/workflow', authentication_1.authenticateUser, workflow_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/workflow/:workflowID/task', authentication_1.authenticateUser, task_1.default);
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
