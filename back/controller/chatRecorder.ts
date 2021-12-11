import { chatHistory } from '../data/db';
import { ChatEvent, Data } from '../services/types';

export function record(data: Data, eventType: ChatEvent) {
  switch (eventType) {
    case ChatEvent.UserJoined:
      chatHistory.push({
        username: 'Server',
        message: `${data.username} joined`,
        time: data.time,
      });
      break;
    case ChatEvent.UserLeft:
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
