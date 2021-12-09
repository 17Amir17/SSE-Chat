import { Response } from 'express';
import {
  ChatEvent,
  ConnectionList,
  Data,
  UserRequest,
} from '../services/types';

const { removeUser, getUsersArr, chatHistory } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

const USER_JOINED = 'USER_JOINED';
const USER_LEFT = 'USER_LEFT';

const connections: ConnectionList = {};

export function onSend(req: UserRequest, res: Response) {
  const { message } = req.body;
  if (!message) throw errorCodes.emptyMessage;
  broadcast({ username: req.username, message });
  res.status(200).send('sent');
}

async function broadcast(
  data: Data,
  eventType: ChatEvent = ChatEvent.ChatMessage
) {
  data.time = new Date(); // Give time to date
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

export async function stream(req: UserRequest, res: Response) {
  console.log(`Streaming for ${req.username}`);
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    //Send hello
    broadcast({ username: req.username }, ChatEvent.UserJoined);
    //When Connection close remove connection
    req.on('close', () => {
      onDisconnect(req.username);
    });
  } catch (error) {
    console.log(error);
    onDisconnect(req.username);
  }
}

async function sendEvent(stream: Response, event: ChatEvent, data: Data) {
  await stream.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

async function onDisconnect(username: string) {
  console.log(`${username} Connection closed`);
  try {
    delete connections[username];
    removeUser(username);
    console.log(getUsersArr());
    await broadcast({ username }, ChatEvent.UserLeft);
  } catch (error) {
    console.log(error);
  }
}

export function getUsers(_req: UserRequest, res: Response) {
  res.json(getUsersArr());
}

export function getHistory(_req: UserRequest, res: Response) {
  res.json(chatHistory);
}

export function record(data: Data, eventType: ChatEvent) {
  switch (eventType) {
    case USER_JOINED:
      chatHistory.push({
        username: 'Server',
        message: `${data.username} joined`,
        time: data.time,
      });
      break;
    case USER_LEFT:
      chatHistory.push({
        username: 'Server',
        message: `${data.username} left`,
        time: data.time,
      });
      break;
    default:
      chatHistory.push(data);
      break;
  }
}
