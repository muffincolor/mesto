import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._callback = submitCallback;
  }

  _getInputValues() {
    return Array.from(this._popup.querySelector('.popup__form').elements);
  }

  setEventListeners() {
    this._handleEscClose();
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
    this._popup.addEventListener('submit', this._callback)
  }

  close() {
    this._getInputValues().forEach((input) => {
      if(input.type === 'text' || input.type === 'url') {
        input.value = '';
      }
    });
    this._popup.classList.remove('popup_active');
  }
}
