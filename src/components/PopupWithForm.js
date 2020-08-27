import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._callback = submitCallback;
  }

  _getInputValues() {
    return this._popup.querySelector('.popup__form').elements;
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
    this._popup.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());
    });
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }
}
