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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const asyncWrapper_1 = require("../middleware/asyncWrapper");
const Task_1 = require("../models/Task");
const notFoundError_1 = require("../errors/notFoundError");
exports.getTasks = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.params;
    const tasks = yield Task_1.Task.findAll({
        where: Object.assign({}, filters)
    });
    if (tasks.length === 0) {
        return next(new notFoundError_1.NotFoundError('No tasks found.'));
    }
    res.send(tasks);
}));
exports.getTask = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskID = req.params.taskID;
    console.log(`Getting task for ${taskID}`);
    const task = yield Task_1.Task.findOne({ where: { taskID: taskID } });
    console.log("🚀 ~ file: tasks.ts:23 ~ getTask ~ task:", task);
    if (!task) {
        return next(new notFoundError_1.NotFoundError(`No task with id : ${taskID}`));
    }
    res.send(task);
}));
exports.createTask = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workflowID = req.params.workflowID;
    const _a = req.body, { taskID } = _a, colsToCreate = __rest(_a, ["taskID"]);
    console.log(`Creating task for ${taskID}`);
    yield Task_1.Task.create(Object.assign(Object.assign({}, colsToCreate), { workflowID: workflowID }));
    res.send({ msg: 'Task created!' });
}));
exports.updateTask = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskID = req.params.taskID;
    const workflowID = req.params.workflowID;
    const _b = req.body, { taskID: ignoreID } = _b, colsToUpdate = __rest(_b, ["taskID"]);
    yield Task_1.Task.update(Object.assign(Object.assign({}, colsToUpdate), { workflowID: workflowID }), { where: { taskID: taskID } });
    console.log(`Creating task for ${taskID}`);
    res.send(`Task updated!`);
}));
exports.deleteTask = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskID } = req.params;
    const task = yield Task_1.Task.destroy({ where: { taskID: taskID } });
    if (task === 0) {
        return next(new notFoundError_1.NotFoundError('The task does not exist to delete.'));
    }
    res.send({ msg: `Task ${taskID} has been deleted.` });
}));
