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

  editButton.addEventListener('click', togglePopupByClick); // Редактировать профиль
  addButton.addEventListener('click', togglePopupByClick); // Добавить место
}

function togglePopup(popup) {
  popup.classList.toggle('popup_active');
}

function fillInputsForEditForm(popup) {
  const form = popup.querySelector('.popup__form');
  form.elements.name.value = document.querySelector('.profile__name').textContent;
  form.elements.activities.value = document.querySelector('.profile__activities').textContent;
}

function togglePopupByClick(evt) {
  if (!isPopupActive(evt.target)) {
    if (evt.target.classList.contains('profile__edit-button')) {
      fillInputsForEditForm(document.querySelector('.popup_for_edit'));
      closePopupByOverlay(document.querySelector('.popup_for_edit'));
      closePopupByEscape(document.querySelector('.popup_for_edit'));
      closePopupByCloseButton(document.querySelector('.popup_for_edit'));
      setupActionOnSubmitForEditForm(document.querySelector('.popup_for_edit').querySelector('.popup__form'));
      togglePopup(document.querySelector('.popup_for_edit'));
    } else if (evt.target.classList.contains('profile__add-button')) {
      closePopupByOverlay(document.querySelector('.popup_for_add'));
      closePopupByEscape(document.querySelector('.popup_for_add'));
      closePopupByCloseButton(document.querySelector('.popup_for_add'));
      setupActionOnSubmitForAddForm(document.querySelector('.popup_for_add').querySelector('.popup__form'));
      togglePopup(document.querySelector('.popup_for_add'));
    } else if (evt.target.classList.contains('element__photo')) {
      setupPopupBeforeToggle(evt.target, document.querySelector('.popup_for_photo'));
      closePopupByOverlay(document.querySelector('.popup_for_photo'));
      closePopupByEscape(document.querySelector('.popup_for_photo'));
      closePopupByCloseButton(document.querySelector('.popup_for_photo'));
      togglePopup(document.querySelector('.popup_for_photo'));
    } else {
      alert('Ошибка');
    }
  } else {
    if (evt.target.classList.contains('profile__edit-button')) {
      togglePopup(document.querySelector('.popup_for_edit'));
      document.querySelector('.popup_for_edit').querySelector('.popup__form').removeEventListener('submit', submitEdit);
    } else if (evt.target.classList.contains('profile__add-button')) {
      togglePopup(document.querySelector('.popup_for_add'));
      document.querySelector('.popup_for_add').querySelector('.popup__form').removeEventListener('submit', submitAdd);
    } else if (evt.target.classList.contains('element__photo')) {
      togglePopup(document.querySelector('.popup_for_photo'));
    } else {
      alert('Ошибка');
    }
  }
}

function closePopupByOverlay(popup) {
  if(!isPopupActive(popup)){
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
  if(!isPopupActive(popup)){
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

function submitAdd(evt) {
  evt.preventDefault();
  placeElementOnPage(renderElement(evt.target.elements.title.value, evt.target.elements.url.value));
  togglePopup(evt.target.closest('.popup'));
}

function modifyProfile(newName, newActivities) {
  const profileName = document.querySelector('.profile__name');
  const profileActivities = document.querySelector('.profile__activities');

  profileName.textContent = newName;
  profileActivities.textContent = newActivities;
}









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
    placeElementOnPage(renderElement(cardInfo.name, cardInfo.link));
  });

  registerLikeButton();
  registerDeleteButton();
}

function renderElement(name, link) {
  const elemntTemplate = document.querySelector('#element-template').content;
  const newElement = elemntTemplate.cloneNode(true);


  newElement.querySelector('.element__info').querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__photo').src = link;

  registerClickOnImage(newElement.querySelector('.element__photo'));

  return newElement;
}

function placeElementOnPage(element) {
  const elementsBlock = document.querySelector('.elements');
  elementsBlock.prepend(element);
}

function registerLikeButton() {
  document.querySelector('.elements').addEventListener('click', likeElement);
}

function likeElement(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    evt.target.classList.toggle('element__like-button_status_active');
  }
}

function registerDeleteButton() {
  document.querySelector('.elements').addEventListener('click', deleteElement);
}

function deleteElement(evt) {
  if (evt.target.classList.contains('element__delete-button')) {
    evt.target.closest('.element').remove();
  }
}

function registerClickOnImage(element) {
  element.addEventListener('click', togglePopupByClick); // Редактировать профиль
}
