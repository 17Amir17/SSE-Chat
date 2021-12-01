const errorCodes = require('../middleware/errorHandler/errorCodes');

const CHAT_MESSAGE = 'CHAT_MESSAGE';
const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const connections = {};

function onSend(req, res) {
  const { message } = req.body;
  if (!message) throw errorCodes.emptyMessage;
  broadcast({ username: req.username, message });
  res.status(200).send('sent');
}

async function broadcast(data, eventType = CHAT_MESSAGE) {
  console.log('Broadcast ' + JSON.stringify(data));
  for (const connection in connections) {
    try {
      const stream = connections[connection].stream;
      await sendEvent(stream, eventType, data);
    } catch (error) {}
  }
}

async function stream(req, res) {
  console.log(`Streaming for ${req.username}`);
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    //Send hello
    sendEvent(res, USER_JOINED, { username: req.username });
    //When Connection close remove connection
    req.on('close', () => {
      onDisconnect(req.username);
    });
  } catch (error) {
    console.log(error);
    onDisconnect(req.username);
  }
}

async function sendEvent(stream, event, data) {
  await stream.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

async function onDisconnect(username) {
  console.log(`${username} Connection closed`);
  await broadcast({ username }, USER_LEFT);
  delete connections[username];
}

module.exports = { onSend, stream };
