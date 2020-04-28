import createNewElement from './createNewElement.js';
import readDate from './readDate.js';

export default function createMessageCard(userName, date, text) {
  const messageCard = createNewElement('div', 'message-card');
  const readedDate = readDate(date);
  const messageInfo = createNewElement('div', 'message-info', `<p>${userName}, ${readedDate}</p>`);
  const messageText = createNewElement('div', 'message-text', `<p>${text}</p>`);

  messageCard.appendChild(messageInfo);
  messageCard.appendChild(messageText);

  return messageCard;
}
