/* eslint-disable no-param-reassign */
import createMessageCard from './createMessageCard.js';

export default async function getChatHistory(chatContainer) {
  const response = await fetch('https://ahj-homework-8-2.herokuapp.com');
  if (response.ok) {
    const chatArchive = await response.json();
    chatArchive.forEach((item) => {
      const msg = JSON.parse(item);
      const msgCard = createMessageCard(msg.user, msg.time, msg.text);
      chatContainer.appendChild(msgCard);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    });
  }
}
