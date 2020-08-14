import FormValidator from './FormValidator.js';
import Card from './Card.js';

const cardsBlock = document.querySelector('.elements__block');
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
const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const editPopup = document.querySelector('.popup_for_edit');
const addPopup = document.querySelector('.popup_for_add');

const startSetupFormsValidation = function () {
  document.querySelectorAll('.popup__form').forEach(function (form) {
    const formValidator = new FormValidator(params, form);
    formValidator.enableValidation();
  });
};

startSetupFormsValidation();

const addActionsOnProfileButtons = function () {
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');

  editButton.addEventListener('click', () => {
    const form = editPopup.querySelector('.popup__form');
    form.elements.name.value = document.querySelector('.profile__name').textContent;
    form.elements.activities.value = document.querySelector('.profile__activities').textContent;
    openPopup(editPopup);
  }); // Редактировать профиль
  addButton.addEventListener('click', () => {
    openPopup(addPopup);
  }); // Добавить место
};

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(evt.target.closest('.popup'));
    }
  });
});

const editFormSubmitHandler = function(evt) {
  evt.preventDefault();
  modifyProfile(evt.target.elements.name.value, evt.target.elements.activities.value);
  closePopup(evt.target.closest('.popup'));
};

editPopup.querySelector('.popup__form').addEventListener('submit', editFormSubmitHandler);

const addFormSubmitHandler = function(evt) {
  placeElementOnPage(cardsBlock, createElement({
    name: evt.target.elements.title.value,
    link: evt.target.elements.url.value
  }));
  closePopup(evt.target.closest('.popup'));
};

addPopup.querySelector('.popup__form').addEventListener('submit', addFormSubmitHandler);

const closePopupByEscape = function (evt) {
  const activePopup = document.querySelector('.popup_active');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

export const openPopup = function (popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keyup', closePopupByEscape);
};

const closePopup = function (popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keyup', closePopupByEscape);
};

addActionsOnProfileButtons();

const modifyProfile = function (newName, newActivities) {
  const profileName = document.querySelector('.profile__name');
  const profileActivities = document.querySelector('.profile__activities');

  profileName.textContent = newName;
  profileActivities.textContent = newActivities;
};

const createElements = function () {
  initialCards.forEach((cardInfo) => {
    const cardElement = createElement(cardInfo);

    placeElementOnPage(cardsBlock, cardElement);
  });
};

const createElement = function (data) {
  const card = new Card(data, '#element-template');
  const cardElement = card.generateCard();

  return cardElement;
};

const placeElementOnPage = function (elementsBlock, element) {
  elementsBlock.prepend(element);
};

createElements();
