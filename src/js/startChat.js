import createMessage from './createMessage.js';
import renderMessageCard from './renderMessageCard.js';
import createUserName from './createUserName.js';

export default function startChat(currentUser, widgetHtml) {
  const [currentUsersContainer, chatContainer, sendMessageForm, messageInput] = widgetHtml.elements;

  const ws = new WebSocket('wss://ahj-homework-8-2.herokuapp.com/wss');
  ws.binaryType = 'blob';

  ws.addEventListener('open', () => {
    sendMessageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const isValid = messageInput.checkValidity();
      if (isValid) {
        const message = createMessage(currentUser, messageInput.value, chatContainer);
        ws.send(message);
        messageInput.value = '';
      }
    });
    sendMessageForm.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        const isValid = messageInput.checkValidity();
        if (isValid) {
          const message = createMessage(currentUser, messageInput.value, chatContainer);
          ws.send(message);
          messageInput.value = '';
        }
      }
    });
  });
  ws.addEventListener('message', (evt) => {
    const data = JSON.parse(evt.data);
    if (Object.prototype.hasOwnProperty.call(data, 'user')) {
      renderMessageCard(data.user, data.time, data.text, chatContainer);
    } else {
      currentUsersContainer.innerHTML = '';
      data.forEach((item) => {
        const card = createUserName(item.name);
        if (item.name === currentUser) {
          currentUsersContainer.prepend(card);
          card.classList.add('current-user');
        } else {
          currentUsersContainer.appendChild(card);
        }
      });
    }
  });
  ws.addEventListener('close', (evt) => {
    console.log('connection closed', evt);
  });
  ws.addEventListener('error', () => {
    console.log('error');
  });
}
