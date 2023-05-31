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
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
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
