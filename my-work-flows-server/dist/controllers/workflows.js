"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkFlow = exports.updateWorkFlow = exports.createWorkflow = exports.getWorkflows = void 0;
const getWorkflows = (req, res) => {
    console.log('getworkflows');
    res.send("getWorkflows");
};
exports.getWorkflows = getWorkflows;
const createWorkflow = (req, res) => {
    const params = req.params;
    console.log("🚀 ~ file: workflows.ts:10 ~ createWorkflow ~ params:", params);
    res.send('createWorkFlow');
};
exports.createWorkflow = createWorkflow;
const updateWorkFlow = (req, res) => {
    res.send('updateWorkFlow');
};
exports.updateWorkFlow = updateWorkFlow;
const deleteWorkFlow = (req, res) => {
    res.send('deleteWorkFlow');
};
exports.deleteWorkFlow = deleteWorkFlow;
