import express from 'express'
import { createDependencies } from '../controllers/dependencies';
const router = express.Router({ mergeParams: true });

router.route('/').post(createDependencies);
router.route('/').put(createDependencies);

export default router;