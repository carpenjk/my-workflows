"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_1 = require("../controllers/workflows");
const express = require('express');
const router = express.Router();
router.route('/').get(workflows_1.getWorkflows).post(workflows_1.createWorkflow);
router.route('/:id').patch(workflows_1.updateWorkFlow);
module.exports = router;
