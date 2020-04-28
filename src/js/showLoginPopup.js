import createNewElement from './createNewElement.js';

export default function showLoginPopup() {
  const bodyEl = document.querySelector('body');

  const popupContainer = createNewElement('div', 'popup-container');
  const addUserPopup = createNewElement('div', 'add-user-popup');
  const addUserPopupHeader = createNewElement('div', 'header', '<p>Выберите псевдоним</p>');
  const addUserForm = createNewElement('form', 'form');
  const addUserInput = createNewElement('input', 'name-field');
  addUserInput.required = true;
  const userSaveBtn = createNewElement('button', 'user-save-btn', 'Продолжить');
  const errorNameExist = createNewElement('div', 'error', '<p>Данное имя уже существует</p>');

  addUserForm.appendChild(addUserInput);
  addUserForm.appendChild(userSaveBtn);

  addUserPopup.appendChild(addUserPopupHeader);
  addUserPopup.appendChild(addUserForm);
  popupContainer.appendChild(addUserPopup);

  bodyEl.insertBefore(popupContainer, bodyEl.lastChild);

  return [popupContainer, addUserForm, addUserInput, errorNameExist];
}
