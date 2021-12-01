const express = require('express');
const {
  onSend,
  stream,
  getUsers,
  getHistory,
} = require('../controller/messageController');
const router = express.Router();

router.post('/send', onSend);
router.get('/stream', stream);
router.get('/userList', getUsers);
router.get('/history', getHistory);

module.exports = router;
