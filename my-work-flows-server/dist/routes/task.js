"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = require("../controllers/tasks");
const router = express_1.default.Router({ mergeParams: true });
router.route('/').get(tasks_1.getTasks).post(tasks_1.createTask);
router.route('/:taskID').get(tasks_1.getTask).patch(tasks_1.updateTask);
exports.default = router;
