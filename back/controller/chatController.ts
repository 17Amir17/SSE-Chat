import { Response } from 'express';
import {
  ChatEvent,
  ConnectionList,
  Data,
  UserRequest,
  UserConnectionEvent,
  UserSendMessageEvent,
  UserTypingEvent,
} from '../services/types';
import { getUsersArr, chatHistory, removeOnlineUser } from '../data/db';
import errorCodes from '../middleware/errorHandler/errorCodes';
import TypedEvent from '../services/TypedEvent';
import {
  onConnect,
  onDisconnect,
  onUserSendMessage,
  onUserTyping,
} from './messageController';
import { record } from './chatRecorder';

export const connections: ConnectionList = {};
//Create Events
const onDisconnectEvent = new TypedEvent<UserConnectionEvent>();
const onConnectEvent = new TypedEvent<UserConnectionEvent>();
const onSendEvent = new TypedEvent<UserSendMessageEvent>();
const onUserTypingEvent = new TypedEvent<UserTypingEvent>();
//Sub to events
onDisconnectEvent.on(onDisconnect);
onConnectEvent.on(onConnect);
onSendEvent.on(onUserSendMessage);
onUserTypingEvent.on(onUserTyping);

export function onSend(req: UserRequest, res: Response) {
  const { message } = req.body;
  if (!message) throw errorCodes.emptyMessage;
  onSendEvent.emit({ username: req.username, message });
  res.status(200).send('sent');
}

export async function stream(req: UserRequest, res: Response) {
  console.log(`Streaming for ${req.username}`);
  res.setHeader('Content-Type', 'text/event-stream');
  try {
    //Add user to connections
    connections[req.username] = { name: req.username, stream: res };
    onConnectEvent.emit({ username: req.username });
    //When Connection close remove connection
    req.on('close', () => {
      onDisconnectEvent.emit({ username: req.username });
    });
  } catch (error) {
    console.log(error);
    onDisconnectEvent.emit({ username: req.username });
  }
}

export function getUsers(_req: UserRequest, res: Response) {
  console.log(getUsersArr());
  res.json(getUsersArr());
}

export function getHistory(_req: UserRequest, res: Response) {
  res.json(chatHistory);
}

export function userTyping(req: UserRequest, res: Response) {
  onUserTypingEvent.emit({ username: req.username });
  res.json();
}

export async function broadcast(
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

async function sendEvent(stream: Response, event: ChatEvent, data: Data) {
  await stream.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

export function removeUserAndConnection(username: string) {
  try {
    delete connections[username];
    removeOnlineUser(username);
  } catch (error) {
    console.log(error);
  }
}
