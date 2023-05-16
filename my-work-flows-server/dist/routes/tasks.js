"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("../controllers/tasks");
const express = require('express');
const router = express.Router();
router.route('/').get(tasks_1.getTasks);
router.route('/:taskId').get(tasks_1.getTask).post(tasks_1.createTask).patch(tasks_1.updateTask);
module.exports = router;
