import { createWorkflow, getWorkflows, updateWorkFlow } from "../controllers/workflows";

const express = require('express');
const router = express.Router();

router.route('/').get(getWorkflows).post(createWorkflow);
router.route('/:id').patch(updateWorkFlow);

module.exports = router;