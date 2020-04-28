/* eslint-disable no-param-reassign */
import createMessageCard from './createMessageCard.js';

export default function createMessage(user, date, value, chatContainer) {
  const newMessageCard = createMessageCard(user, date, value);
  chatContainer.appendChild(newMessageCard);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  return newMessageCard;
}
