import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = super.getPopup();
    this._imageSelector = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open( { name, link } ) {
    this._imageSelector.src = link;
    this._imageSelector.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
