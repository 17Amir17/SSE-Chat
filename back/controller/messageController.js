const errorCodes = require('../middleware/errorHandler/errorCodes');

const connections = {};

function onSend(req, res) {
  const { message } = req.body;
  if (!message) throw errorCodes.emptyMessage;
  broadcast({ sender: req.username, message });
}

function broadcast(data) {
  console.log('Broadcast ' + JSON.stringify(data));
  for (const connection in connections) {
    connections[connection].stream.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}

async function stream(req, res) {
  console.log(`Streaming for ${req.username}`);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  });
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    //Send hello
    res.write('data: Hello');
    //When Connection close remove connection
    req.on('close', () => {
      onDisconnect(req.username);
    });
  } catch (error) {
    console.log(error);
    onDisconnect(req.username);
  }
}

function onDisconnect(username) {
  console.log(`${username} Connection closed`);
  connections[username] = undefined;
}

module.exports = { onSend, stream };
