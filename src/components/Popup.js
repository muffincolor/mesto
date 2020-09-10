export const Popup = class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.escListenerBind = this._handleEscClose.bind(this);
    this._popupButton = this._popup.querySelector('.popup__button');
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keyup', this.escListenerBind);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keyup', this.escListenerBind);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    });
  }

  getPopup() {
    return this._popup;
  }
}
