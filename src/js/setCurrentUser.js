import createUserName from './createUserName.js';
import trySetName from './trySetName.js';

export default async function setCurrentUser(popup, usersContainer) {
  const [popupContainer, form, input, error] = popup;
  const setNickname = new Promise((resolve) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (input.checkValidity()) {
        const isNameExist = new Promise((res) => res(trySetName(input.value)));
        isNameExist.then((result) => {
          if (result.status === 204) {
            const currentUser = createUserName(input.value);
            usersContainer.appendChild(currentUser);
            currentUser.classList.add('current-user');
            resolve(input.value);
            popupContainer.remove();
          }
          if (result.status === 205) {
            input.after(error);
          }
        });
      }
    });
  });
  input.addEventListener('input', () => {
    error.remove();
  });
  const currentUser = setNickname;
  return currentUser;
}
