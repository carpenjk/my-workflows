"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const getTasks = (req, res) => {
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
