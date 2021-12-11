import { TypingUser } from '../services/types';

const timeForTyping = 1000; //Miliseconds
const currentlyTyping: TypingUser = {};

export function userIsTyping(name: string) {
  currentlyTyping[name] = new Date().getTime();
  setTimeout(() => {
    //Check if still typing in x seconds
    checkIfTyping(name);
  }, timeForTyping);
}

function checkIfTyping(name: string) {
  const timePassed = currentlyTyping[name] - new Date().getTime();
  if (timePassed > timePassed) {
    // Stopped typing
    console.log(name + ' stopped typing');
  }
}
