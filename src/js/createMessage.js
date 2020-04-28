/* eslint-disable no-param-reassign */
import renderMessageCard from './renderMessageCard.js';

export default function createMessage(currentUser, inputValue, chatContainer) {
  const date = +new Date();
  const newMessageCard = renderMessageCard(currentUser, date, inputValue, chatContainer);
  newMessageCard.classList.add('current-user');
  const message = JSON.stringify({ user: currentUser, time: date, text: inputValue });

  return message;
}
