import createNewElement from './createNewElement.js';

export default function createUserName(userName) {
  const nameCard = createNewElement('div', 'user-name-container', `<p>&#128064;</p><p>${userName}</p>`);
  return nameCard;
}
