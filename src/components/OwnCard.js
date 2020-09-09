import Card from "./Card";

export default class OwnCard extends Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    super(data, cardSelector, handleCardClick, handleLikeClick);
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      super._likeElement(evt);
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
      this._deleteElement(evt)
    });
    this._element.querySelector('.element__photo').addEventListener('click', () => {
      this._cardClickCallback(this._name, this._image);
    });
  }

  _deleteElement(evt) {
    this._handleDeleteClick(evt, this._cardId);
  }
}
