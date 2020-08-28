export const Popup = class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keyup',(e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keyup', (e) => this._handleEscClose(e));
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
