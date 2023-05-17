"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const Task_1 = require("../models/Task");
const getTasks = (req, res) => {
    Task_1.Task.create({
        name: 'task 4',
        description: 'task 4 description',
        owner: BigInt(1),
        reviewer: BigInt(2),
        dueDate: new Date('2023-05-30T17:00:00'),
        dependencies: [BigInt(1), BigInt(2)],
        workflowID: BigInt(1),
    });
    res.send('getTasks');
};
exports.getTasks = getTasks;
const getTask = (req, res) => {
    res.send('getTask');
};
exports.getTask = getTask;
const createTask = (req, res) => {
    res.send('createTasks');
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    res.send('updateTask');
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    res.send('deleteTask');
};
exports.deleteTask = deleteTask;
