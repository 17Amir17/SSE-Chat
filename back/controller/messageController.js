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
    connections[connection].stream.write(
      `event: message\ndata: ${JSON.stringify(data)}\n\n`
    );
  }
}

async function stream(req, res) {
  console.log(`Streaming for ${req.username}`);
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    //Send hello
    setInterval(() => {
      res.write('data: Hello\n\n');
    }, 2000);
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
