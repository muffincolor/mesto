import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._title = name;
    this._image = link;
  }

  open( { name, link } ) {
    this._popup = super.getPopup();
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__image').alt = name;
    this._popup.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}
