"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../models/Task");
const User_1 = require("../models/User");
const Workflow_1 = require("../models/Workflow");
const sequelize_1 = require("../adapters/sequelize");
const Dependency_1 = require("../models/Dependency");
const session_1 = require("../middleware/session");
require('dotenv').config();
const isDev = process.env.NODE_ENV === 'development';
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    yield sequelize_1.sequelize.sync({ force: isDev });
    yield sequelize_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    yield session_1.sequelizeStore.sync({ force: isDev });
    yield User_1.User.bulkCreate([
        { name: 'Guest One', email: 'guest1@example.com', password: 'password', createdAt: new Date() },
        { name: 'Guest Two', email: 'guest2@example.com', password: 'password', createdAt: new Date() }
    ]);
    yield Workflow_1.Workflow.bulkCreate([
        { name: 'Workflow 1', description: 'This is Workflow 1' }
    ]);
    yield Task_1.Task.bulkCreate([
        {
            name: 'task 1',
            description: 'task 1 description',
            owner: BigInt(1),
            reviewer: BigInt(2),
            dueDate: new Date('2023-05-30T17:00:00'),
            startDate: new Date(),
            workflowID: BigInt(1),
        },
        {
            name: 'task 2',
            description: 'task 2 description',
            owner: BigInt(1),
            reviewer: BigInt(2),
            dueDate: new Date('2023-05-30T17:00:00'),
            workflowID: BigInt(1),
        },
        {
            name: 'task 3',
            description: 'task 3 description',
            owner: BigInt(1),
            reviewer: BigInt(2),
            dueDate: new Date('2023-05-30T17:00:00'),
            workflowID: BigInt(1),
        }
    ]);
    yield Dependency_1.Dependency.bulkCreate([
        { taskID: BigInt(2), dependency: BigInt(1) },
        { taskID: BigInt(3), dependency: BigInt(1) },
        { taskID: BigInt(3), dependency: BigInt(2) }
    ]);
});
init();
exports.default = init;
