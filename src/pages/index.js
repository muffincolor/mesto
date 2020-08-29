import './index.css';

import {
  addPopup,
  cardsBlock,
  editPopup,
  initialCards,
  params,
  editForm,
  editButton,
  addButton
} from "../utils/constants";

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import {Section} from "../components/Section";
import {PopupWithForm} from "../components/PopupWithForm";
import {UserInfo} from "../components/UserInfo";
import {PopupWithImage} from "../components/PopupWithImage";

const userInfo = new UserInfo({
  profileNameSelector: document.querySelector('.profile__name'),
  profileActivitiesSelector: document.querySelector('.profile__activities')
});

const editPopupElement = new PopupWithForm((values) => {
  userInfo.setUserInfo(values.name, values.activities);
  editPopupElement.close();
}, editPopup);
editPopupElement.setEventListeners();

const createNewCard = function (data, cardSectionSelector) {
  return new Card(data, cardSectionSelector, (cardName, cardImage) => {
    imagePopupElement.open({
      name: cardName,
      link: cardImage
    });
  });
}

const addPopupElement = new PopupWithForm((values) => {
  const card = createNewCard({
    name: values.title,
    link: values.url
  }, '#element-template');

  cardsList.addItem(card.generateCard());
  addPopupElement.close();
}, addPopup);
addPopupElement.setEventListeners();

const imagePopupElement = new PopupWithImage('.popup_for_photo');
imagePopupElement.setEventListeners();

const cardsList = new Section({
    data: initialCards,
    renderer: (item) => {
      const card = createNewCard(item, '#element-template');
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
  editButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    editForm.elements.name.value = info.name;
    editForm.elements.activities.value = info.activities;
    editPopupElement.open();
  });

  addButton.addEventListener('click', () => {
    addPopupElement.open();
  });
};

addActionsOnProfileButtons();
