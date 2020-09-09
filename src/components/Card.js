export default class Card {
  constructor({ name, link, likes, _id, isLiked  }, cardSelector, handleCardClick, handleLikeClick) {
    this._name = name;
    this._image = link;
    this._likes = likes.length;
    this._cardId = _id;
    this._cardClickCallback = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._isLiked = isLiked;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._likeElement(evt);
    });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._cardClickCallback(this._name, this._image);
    });
  }

  _likeElement(evt) {
    if (evt.target.classList.contains('element__like-button')) {
      this._handleLikeClick(this._cardId, this._isLiked, evt);
    }
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    if(this._isLiked) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_status_active');
    }
    this._imageSelector = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__info').querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__info').querySelector('.element__likes').textContent = this._likes;
    this._element.querySelector('.element').setAttribute('id', this._cardId);
    this._imageSelector.src = this._image;
    this._imageSelector.alt = this._name;

    return this._element;
  }
}
