import express from 'express';
import {
  onSend,
  stream,
  getUsers,
  getHistory,
} from '../controller/chatController';
import { UserRequest } from '../services/types';
const router = express.Router();

router.post('/send', (req, res) => {
  onSend(req as UserRequest, res);
});
router.get('/stream', (req, res) => {
  stream(req as UserRequest, res);
});
router.get('/userList', (req, res) => {
  getUsers(req as UserRequest, res);
});
router.get('/history', (req, res) => {
  getHistory(req as UserRequest, res);
});

export default router;
