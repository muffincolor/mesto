import '../../pages/index.css';

import {addPopup, editPopup, params, initialCards, cardsBlock} from "../utils/constants";

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import {Section} from "../components/Section";
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {PopupWithImage} from "../components/PopupWithImage";

const editPopupElement = new PopupWithForm((evt) => {
  evt.preventDefault();
  new UserInfo( { name: evt.target.elements.name.value, activities: evt.target.elements.activities.value } )
    .setUserInfo();
  editPopupElement.close();
}, editPopup);
editPopupElement.setEventListeners();

const addPopupElement = new PopupWithForm((evt) => {
  evt.preventDefault();
  const card = new Card({
    name: evt.target.elements.title.value,
    link: evt.target.elements.url.value
  }, '#element-template', (evt) => {
    const popup = new PopupWithImage(
      {
        name: evt.target.closest('.element').querySelector('.element__title').textContent,
        link: evt.target.closest('.element').querySelector('.element__photo').src
      },
      '.popup_for_photo');
    popup.setEventListeners();
    popup.open();
  });
  cardsList.addItem(card.generateCard());
  addPopupElement.close();
}, addPopup);
addPopupElement.setEventListeners();

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#element-template', (evt) => {
        const popup = new PopupWithImage({ name: item.name, link: item.link }, '.popup_for_photo');
        popup.setEventListeners();
        popup.open();
      });
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  }, cardsBlock);

cardsList.renderItems();

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
    const form = document.querySelector(editPopup).querySelector('.popup__form');
    const userInfo = new UserInfo('', '').getUserInfo();
    form.elements.name.value = userInfo.name;
    form.elements.activities.value = userInfo.activities;
    editPopupElement.open();
  });

  addButton.addEventListener('click', () => {
    addPopupElement.open();
  });
};

addActionsOnProfileButtons();
