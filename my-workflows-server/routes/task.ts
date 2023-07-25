import express from 'express'
import { createTask, getTasks, getTask, updateTask } from "../controllers/tasks";

const router = express.Router({ mergeParams: true });

router.route('/').get(getTasks).post(createTask);
router.route('/:taskID').get(getTask).patch(updateTask);

export default router;