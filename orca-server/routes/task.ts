import express from 'express'
import { getTasks, getTask, updateTask, updateTasks, createTasks, deleteTask, deleteTasks } from "../controllers/tasks";

const router = express.Router({ mergeParams: true });

router.route('/').get(getTasks).post(createTasks).put(updateTasks).delete(deleteTasks);
router.route('/:taskID').get(getTask).patch(updateTask).put(updateTask).delete(deleteTask);


export default router;