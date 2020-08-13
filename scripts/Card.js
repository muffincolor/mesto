import { toggleImagePopup } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._likeElement);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteElement);
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._setupAndOpenPopup();
    });
  }

  _setupAndOpenPopup() {
    const popup = document.querySelector('.popup_for_photo');
    popup.querySelector('.popup__image').src = this._image;
    popup.querySelector('.popup__caption').textContent = this._name;
    toggleImagePopup();
  }

  _likeElement(evt) {
    if (evt.target.classList.contains('element__like-button')) {
      evt.target.classList.toggle('element__like-button_status_active');
    }
  }

  _deleteElement(evt) {
    if (evt.target.classList.contains('element__delete-button')) {
      evt.target.closest('.element').remove();
    }
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__info').querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._image;

    return this._element;
  }
}