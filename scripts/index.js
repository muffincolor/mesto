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

function startSetupFormsValidation() {
  document.querySelectorAll('.popup__form').forEach(function (form) {
    const formValidator = new FormValidator(params, form);
    formValidator.enableValidation();
  });
}

startSetupFormsValidation();

function toggleEditPopup() {
  const editPopup = document.querySelector('.popup_for_edit');
  fillInputsForEditForm(editPopup.querySelector('.popup__form'));
  setupCloseActionsForPopup(editPopup);
  setupActionOnSubmitForEditForm(editPopup.querySelector('.popup__form'));
  openPopup(editPopup);
}

function toggleAddPopup() {
  const addPopup = document.querySelector('.popup_for_add');
  setupCloseActionsForPopup(addPopup);
  setupActionOnSubmitForAddForm(addPopup.querySelector('.popup__form'));
  openPopup(addPopup);
}

export default function toggleImagePopup(evt) {
  const imagePopup = document.querySelector('.popup_for_photo');
  setupCloseActionsForPopup(imagePopup);
  openPopup(imagePopup);
}

function addActionsOnProfileButtons() {
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');

  editButton.addEventListener('click', toggleEditPopup); // Редактировать профиль
  addButton.addEventListener('click', toggleAddPopup); // Добавить место
}

addActionsOnProfileButtons();

function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}

function fillInputsForEditForm(form) {
  form.elements.name.value = document.querySelector('.profile__name').textContent;
  form.elements.activities.value = document.querySelector('.profile__activities').textContent;
}

function setupCloseActionsForPopup(popup) {
  closePopupByOverlay(popup);
  closePopupByEscape(popup);
  closePopupByCloseButton(popup);
}

function closePopupByOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  }); // Здесь идет выбор нужного нам попапа и вешается колбэк, который отсеивается все элементы кроме оверлея.
}

function closePopupByEscape(popup) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key.toLowerCase() === 'escape' && document.querySelector('.popup_active') !== undefined) {
      closePopup(popup);
    }
  });
}

function closePopupByCloseButton(popup) {
  popup.querySelector('.popup__close-btn').addEventListener('click', closeByButton); // Здесь идет выбор крестика для нужного нам попапа и вешается событие его закрытия
}

function closeByButton(evt) {
  closePopup(evt.target.closest('.popup'));
}

function setupActionOnSubmitForEditForm(popupForm) {
  popupForm.addEventListener('submit', submitEdit);
}

function submitEdit(evt) {
  evt.preventDefault();
  modifyProfile(evt.target.elements.name.value, evt.target.elements.activities.value);
  closePopup(evt.target.closest('.popup'));
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

function submitAdd(evt) {
  evt.preventDefault();

  placeElementOnPage(cardsBlock, createElement({
    name: evt.target.elements.title.value,
    link: evt.target.elements.url.value
  }));
  closePopup(evt.target.closest('.popup'));
}

function createElements() {
  initialCards.forEach((cardInfo) => {
    const cardElement = createElement(cardInfo);

    placeElementOnPage(cardsBlock, cardElement);
  });
}

createElements();

function createElement(data) {
  const card = new Card(data, '#element-template');
  const cardElement = card.generateCard();

  return cardElement;
}

function placeElementOnPage(elementsBlock, element) {
  elementsBlock.prepend(element);
}
