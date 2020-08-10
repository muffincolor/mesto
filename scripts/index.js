import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function startSetupFormsValidation() {
  document.querySelectorAll('.popup__form').forEach(function(form) {
    const formValidator = new FormValidator(params, form);
    formValidator.enableValidation();
  });
}

function toggleEditPopup(evt) {
  fillInputsForEditForm(document.querySelector('.popup_for_edit'), document.querySelector('.popup_for_edit').querySelector('.popup__form'));
  setupCloseActionsForPopup(document.querySelector('.popup_for_edit'));
  setupActionOnSubmitForEditForm(document.querySelector('.popup_for_edit').querySelector('.popup__form'));
  togglePopup(document.querySelector('.popup_for_edit'));
}

function toggleAddPopup(evt) {
  setupCloseActionsForPopup(document.querySelector('.popup_for_add'));
  setupActionOnSubmitForAddForm(document.querySelector('.popup_for_add').querySelector('.popup__form'));
  togglePopup(document.querySelector('.popup_for_add'));
}

function toggleImagePopup(evt) {
  setupPopupBeforeToggle(evt.target, document.querySelector('.popup_for_photo'));
  setupCloseActionsForPopup(document.querySelector('.popup_for_photo'));
  togglePopup(document.querySelector('.popup_for_photo'));
}

startSetupFormsValidation();

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

function closePopupByOverlay(popup) {
  popup.addEventListener('click', closeByOverlay); // Здесь идет выбор нужного нам попапа и вешается колбэк, который отсеивается все элементы кроме оверлея.
}

function closeByOverlay(evt) {
  if (evt.target.classList[0].startsWith('popup__')) { // Если это не оверлей, то выходим из фукнкции
    return;
  } else { // если же клик прошел по оверлею, закрываем
    togglePopup(evt.target);
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
  popup.querySelector('.popup__close-btn').addEventListener('click', closeByButton); // Здесь идет выбор крестика для нужного нам попапа и вешается событие его закрытия
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

function submitAdd(evt) {
  evt.preventDefault();

  placeElementOnPage(cardsBlock, createElement({ name: evt.target.elements.title.value, link: evt.target.elements.url.value }));
  togglePopup(evt.target.closest('.popup'));
}

const cardsBlock = document.querySelector('.elements');
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

function createElements() {
  initialCards.forEach((cardInfo) => {
    const cardElement = createElement(cardInfo);

    placeElementOnPage(cardsBlock, cardElement);
  });
}

function createElement(data) {
  const card = new Card(data, '#element-template');
  const cardElement = card.generateCard();

  return cardElement;
}

createElements();

function placeElementOnPage(elementsBlock, element) {
  elementsBlock.prepend(element);
}

export { toggleImagePopup };
