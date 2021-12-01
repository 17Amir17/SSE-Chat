const { removeUser, getUsersArr, history } = require('../data/db');
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
  record(data, eventType);
  for (const connection in connections) {
    try {
      const stream = connections[connection].stream;
      await sendEvent(stream, eventType, data);
    } catch (error) {
      console.log(error);
    }
  }
}

async function stream(req, res) {
  console.log(`Streaming for ${req.username}`);
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    //Send hello
    broadcast({ username: req.username }, USER_JOINED);
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
  try {
    delete connections[username];
    removeUser(username);
    console.log(getUsersArr());
    await broadcast({ username }, USER_LEFT);
  } catch (error) {
    console.log(error);
  }
}

function getUsers(req, res) {
  res.json(getUsersArr());
}

function getHistory(req, res) {
  res.json(history);
}

function record(data, eventType) {
  switch (eventType) {
    case USER_JOINED:
      history.push({
        username: 'Server',
        message: `${data.username} joined`,
      });
      break;
    case USER_LEFT:
      history.push({ username: 'Server', message: `${data.username} left` });
      break;
    default:
      history.push(data);
      break;
  }
}
module.exports = { onSend, stream, getUsers, getHistory };
