import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._callback = submitCallback;
  }

  _getInputValues() {
    const result = {};
    Array.from(this._popup.querySelector('.popup__form').elements).forEach((input) => {
      result[input.name] = input.value;
    });
    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }
}
