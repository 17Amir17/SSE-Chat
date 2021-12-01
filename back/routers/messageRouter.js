const express = require('express');
const { onSend, stream, getUsers } = require('../controller/messageController');
const router = express.Router();

router.post('/send', onSend);
router.get('/stream', stream);
router.get('/userList', getUsers);

module.exports = router;
