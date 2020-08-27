export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._image = link;
    this._cardClickCallback = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._likeElement);
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteElement);
    this._element.querySelector('.element__photo').addEventListener('click', this._cardClickCallback);
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
    this._element.querySelector('.element__photo').alt = this._name;

    return this._element;
  }
}
