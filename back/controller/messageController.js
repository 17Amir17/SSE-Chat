const errorCodes = require('../middleware/errorHandler/errorCodes');

const connections = {};

function onSend(req, res) {
  const { message } = req.body;
  if (!message) throw errorCodes.emptyMessage;
  broadcast({ sender: req.name, message });
}

function broadcast(data) {
  for (const connection in connections) {
    connections[connection].stream.write(`data ${data}`);
  }
}

function stream(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
  });
  try {
    connections[req.name] = { name: req.name, stream: res };
  } catch (error) {
    console.log(error);
    connections[req.name] = undefined;
  }
}

module.exports = { onSend, stream };
