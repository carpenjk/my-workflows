import express from 'express'
import { getTasks, getTask, updateTask, updateTasks, createTasks, deleteTask } from "../controllers/tasks";

const router = express.Router({ mergeParams: true });

router.route('/').get(getTasks).post(createTasks).put(updateTasks);
router.route('/:taskID').get(getTask).patch(updateTask).put(updateTask).delete(deleteTask);


export default router;