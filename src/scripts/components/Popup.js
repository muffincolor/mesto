export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_active');
  }

  close() {
    this._popup.classList.remove('popup_active');
  }

  _handleEscClose() {
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._handleEscClose();
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
