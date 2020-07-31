enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
addActionsOnProfileButtons();

function addActionsOnProfileButtons() {
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');

  editButton.addEventListener('click', toggleEditPopup); // Редактировать профиль
  addButton.addEventListener('click', toggleAddPopup); // Добавить место
}

function togglePopup(popup) {
  popup.classList.toggle('popup_active');
}

function fillInputsForEditForm(popup, form) {
  form.elements.name.value = document.querySelector('.profile__name').textContent;
  form.elements.activities.value = document.querySelector('.profile__activities').textContent;
}

function deleteSubmitEventFromPopupForm(popupForm, callback) {
  popupForm.removeEventListener('submit', callback);
}

function setupCloseActionsForPopup(popup) {
  closePopupByOverlay(popup);
  closePopupByEscape(popup);
  closePopupByCloseButton(popup);
}

function toggleEditPopup(evt) {
  if (!isPopupActive(evt.target)) {
    fillInputsForEditForm(document.querySelector('.popup_for_edit'), document.querySelector('.popup_for_edit').querySelector('.popup__form'));
    setupCloseActionsForPopup(document.querySelector('.popup_for_edit'));
    setupActionOnSubmitForEditForm(document.querySelector('.popup_for_edit').querySelector('.popup__form'));
    togglePopup(document.querySelector('.popup_for_edit'));
  } else {
    togglePopup(document.querySelector('.popup_for_edit'));
    deleteSubmitEventFromPopupForm(document.querySelector('.popup_for_edit').querySelector('.popup__form'), submitEdit);
  }
}

function toggleAddPopup(evt) {
  if (!isPopupActive(evt.target)) {
    setupCloseActionsForPopup(document.querySelector('.popup_for_add'));
    setupActionOnSubmitForAddForm(document.querySelector('.popup_for_add').querySelector('.popup__form'));
    togglePopup(document.querySelector('.popup_for_add'));
  } else {
    togglePopup(document.querySelector('.popup_for_add'));
    deleteSubmitEventFromPopupForm(document.querySelector('.popup_for_add').querySelector('.popup__form'), submitAdd);
  }
}

function toggleImagePopup(evt) {
  if (!isPopupActive(evt.target)) {
    setupPopupBeforeToggle(evt.target, document.querySelector('.popup_for_photo'));
    setupCloseActionsForPopup(document.querySelector('.popup_for_photo'));
    togglePopup(document.querySelector('.popup_for_photo'));
  } else {
    togglePopup(document.querySelector('.popup_for_photo'));
  }

}

function closePopupByOverlay(popup) {
  if (!isPopupActive(popup)) {
    popup.addEventListener('click', closeByOverlay);
  } else {
    popup.removeEventListener('click', closeByOverlay);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList[0].startsWith('popup__')) {
    return;
  } else {
    if (evt.target.classList.contains('popup_for_edit')) {
      togglePopup(document.querySelector('.popup_for_edit'));
    } else if (evt.target.classList.contains('popup_for_add')) {
      togglePopup(document.querySelector('.popup_for_add'));
    } else if (evt.target.classList.contains('popup_for_photo')) {
      togglePopup(document.querySelector('.popup_for_photo'));
    } else {
      alert('Ошибка закрытия');
    }
  }
}

function closePopupByEscape(popup) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key.toLowerCase() === 'escape' && isPopupActive(popup)) {
      togglePopup(popup);
    }
  });
}

function closePopupByCloseButton(popup) {
  if (!isPopupActive(popup)) {
    popup.querySelector('.popup__close-btn').addEventListener('click', closeByButton);
  } else {
    popup.querySelector('.popup__close-btn').removeEventListener('click', closeByButton);
  }
}

function closeByButton(evt) {
  togglePopup(evt.target.closest('.popup'));
}

function isPopupActive(popup) {
  return popup.classList.contains('popup_active');
}

function setupPopupBeforeToggle(element, popup) {
  popup.querySelector('.popup__image').src = element.src;
  popup.querySelector('.popup__caption').textContent = element.closest('.element').querySelector('.element__title').textContent;
}

function setupActionOnSubmitForEditForm(popupForm) {
  popupForm.addEventListener('submit', submitEdit);
}

function submitEdit(evt) {
  evt.preventDefault();
  modifyProfile(evt.target.elements.name.value, evt.target.elements.activities.value);
  togglePopup(evt.target.closest('.popup'));
}

function setupActionOnSubmitForAddForm(popupForm) {
  popupForm.addEventListener('submit', submitAdd);
}

function modifyProfile(newName, newActivities) {
  const profileName = document.querySelector('.profile__name');
  const profileActivities = document.querySelector('.profile__activities');

  profileName.textContent = newName;
  profileActivities.textContent = newActivities;
}









const elementsBlock = document.querySelector('.elements');
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

createElements();

function createElements() {
  initialCards.forEach(function (cardInfo) {
    placeElementOnPage(elementsBlock, createElement(cardInfo.name, cardInfo.link));
  });
}

function createElement(name, link) {
  const elemntTemplate = document.querySelector('#element-template').content;
  const newElement = elemntTemplate.cloneNode(true);

  newElement.querySelector('.element__info').querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__photo').src = link;

  registerClickOnImage(newElement.querySelector('.element__photo'));

  registerLikeButton(newElement.querySelector('.element__like-button'));
  registerDeleteButton(newElement.querySelector('.element__delete-button'));

  return newElement;
}

function placeElementOnPage(elementsBlock, element) {
  elementsBlock.prepend(element);
}

function registerLikeButton(button) {
  button.addEventListener('click', likeElement);
}

function likeElement(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    evt.target.classList.toggle('element__like-button_status_active');
  }
}

function registerDeleteButton(button) {
  button.addEventListener('click', deleteElement);
}

function deleteElement(evt) {
  if (evt.target.classList.contains('element__delete-button')) {
    evt.target.closest('.element').remove();
  }
}

function registerClickOnImage(element) {
  element.addEventListener('click', toggleImagePopup); // Редактировать профиль
}

function submitAdd(evt) {
  evt.preventDefault();
  placeElementOnPage(elementsBlock, createElement(evt.target.elements.title.value, evt.target.elements.url.value));
  togglePopup(evt.target.closest('.popup'));
}
