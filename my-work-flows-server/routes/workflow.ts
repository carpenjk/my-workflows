import { createWorkflow, deleteWorkFlow, getWorkflows, updateWorkFlow } from "../controllers/workflows";
import express from 'express'
const router = express.Router();

router.route('/').get(getWorkflows).post(createWorkflow);
router.route('/:workflowID').patch(updateWorkFlow);
router.route('/:workflowID').delete(deleteWorkFlow);

export default router;