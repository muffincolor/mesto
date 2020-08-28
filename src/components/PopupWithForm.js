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
      if(input.type === 'url' || input.type === 'text') {
        result[input.name] = input.value;
      }
    });
    return result;
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues()
      this._callback(this._getInputValues());
    });
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }
}
