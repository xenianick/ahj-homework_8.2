import createNewElement from './createNewElement.js';
import showLoginPopup from './showLoginPopup.js';
import setCurrentUser from './setCurrentUser.js';
import getChatHistory from './getChatHistory.js';
import startChat from './startChat.js';
import createWidgetChatHtml from './createWidgetChatHtml.js';

const bodyEl = document.querySelector('body');

const mainContainer = createNewElement('div', 'main-container');
const widgetHtml = createWidgetChatHtml();
const widgetContainer = widgetHtml.container;
const [currentUsersContainer, chatContainer] = widgetHtml.elements;

mainContainer.appendChild(widgetContainer);
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

async function login() {
  const popup = showLoginPopup();
  const currentUser = await setCurrentUser(popup, currentUsersContainer);
  await getChatHistory(chatContainer);
  return currentUser;
}

async function chat() {
  const currentUser = await login();
  startChat(currentUser, widgetHtml);
}
chat();
