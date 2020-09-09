import {Popup} from "./Popup";

export class PopupForConfirm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._confirmCallback = callback;
    this._imageSelector = this._popup.querySelector('.popup__image');
  }

  open( id ) {
    this._id = id;
    super.open();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popup.querySelector('.popup__button').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__button').textContent = 'Да';
    }
  }

  setupConfirmation() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmCallback(this._id);
    });
  }
}
