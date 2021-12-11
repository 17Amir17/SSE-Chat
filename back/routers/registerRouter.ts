import express from 'express';
import { register } from '../controller/registerController';
const router = express.Router();

router.post('', register);

export default router;
