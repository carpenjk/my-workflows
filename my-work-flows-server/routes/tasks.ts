import { createTask, getTasks, getTask, updateTask } from "../controllers/tasks";

const express = require('express');
const router = express.Router();

router.route('/').get(getTasks)
router.route('/:taskId').get(getTask).post(createTask).patch(updateTask);

module.exports = router;