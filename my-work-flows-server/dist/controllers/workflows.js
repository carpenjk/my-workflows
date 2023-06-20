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
exports.deleteWorkFlow = exports.updateWorkFlow = exports.createWorkflow = exports.getWorkflows = void 0;
const sequelize_1 = require("sequelize");
const Workflow_1 = require("../models/Workflow");
const asyncWrapper_1 = require("../middleware/asyncWrapper");
const notFoundError_1 = require("../errors/notFoundError");
exports.getWorkflows = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workflows = yield Workflow_1.Workflow.findAll({
        where: {
            completedDate: { [sequelize_1.Op.eq]: null }
        }
    });
    if (workflows.length === 0) {
        return next(new notFoundError_1.NotFoundError('No workflows found.'));
    }
    res.send(workflows);
}));
exports.createWorkflow = (0, asyncWrapper_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { workflowID } = _a, colsToCreate = __rest(_a, ["workflowID"]);
    yield Workflow_1.Workflow.create(Object.assign({}, colsToCreate));
    res.json({ msg: 'Workflow created!' });
}));
exports.updateWorkFlow = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { workflowID } = req.params;
    const workflow = yield Workflow_1.Workflow.update(Object.assign({}, req.body), { where: { workflowID: workflowID } });
    if (workflow[0] === 0) {
        return next(new notFoundError_1.NotFoundError('The workflow does not exist to update.'));
    }
    res.send({ msg: 'Workflow updated!' });
}));
exports.deleteWorkFlow = (0, asyncWrapper_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { workflowID } = req.params;
    const workflow = yield Workflow_1.Workflow.destroy({ where: { workflowID: workflowID } });
    if (workflow === 0) {
        return next(new notFoundError_1.NotFoundError('The workflow does not exist to delete.'));
    }
    res.send({ msg: `Workflow ${workflowID} has been deleted.` });
}));
