"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_1 = require("../controllers/workflows");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.route('/').get(workflows_1.getWorkflows).post(workflows_1.createWorkflow);
router.route('/:workflowID').patch(workflows_1.updateWorkFlow);
router.route('/:workflowID').delete(workflows_1.deleteWorkFlow);
exports.default = router;
