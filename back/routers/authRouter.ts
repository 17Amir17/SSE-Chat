import express from 'express';
import { register } from '../controller/registerController';
import { login } from '../controller/loginController';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
