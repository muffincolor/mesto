import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._imageSelector = this._popup.querySelector('.popup__image');
  }

  open( { name, link } ) {
    this._imageSelector.src = link;
    this._imageSelector.alt = name;
    this._popup.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}
