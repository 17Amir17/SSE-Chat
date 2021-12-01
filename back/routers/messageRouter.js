const express = require('express');
const { onSend, stream } = require('../controller/messageController');
const router = express.Router();

router.post('/send', onSend);
router.get('/stream', stream);

module.exports = router;
