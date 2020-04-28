import createNewElement from './createNewElement.js';

export default function createWidgetChatHtml() {
  const widgetContainer = createNewElement('div', 'widget-container');
  const currentUsersContainer = createNewElement('div', 'current-users-container');

  const chatContainer = createNewElement('div', 'chat-container');
  const sendMessageForm = createNewElement('form', 'send-message-form');
  const messageInput = createNewElement('textarea', 'message-input');
  messageInput.required = true;
  messageInput.placeholder = 'Type your message';
  const messageSendBtn = createNewElement('button', 'message-send-btn', '&#8682;');
  sendMessageForm.appendChild(messageInput);
  sendMessageForm.appendChild(messageSendBtn);

  widgetContainer.appendChild(currentUsersContainer);

  widgetContainer.appendChild(chatContainer);
  widgetContainer.appendChild(sendMessageForm);
  return {
    container: widgetContainer,
    elements: [currentUsersContainer, chatContainer, sendMessageForm, messageInput],
  };
}
