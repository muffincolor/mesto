import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._title = name;
    this._image = link;
  }

  open() {
    this._popup = super.getPopup();
    this._popup.querySelector('.popup__image').src = this._image;
    this._popup.querySelector('.popup__caption').textContent = this._title;
    this._popup.classList.add('popup_active');
  }
}
