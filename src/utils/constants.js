const cardsBlock = '.elements__block';
const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const editPopup = '.popup_for_edit';
const changePhotoPopup = '.popup_for_avatar';
const addPopup = '.popup_for_add';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPhotoButton = document.querySelector('.profile__photo-container');
const confirmPopupSelector = '.popup_for_confirm';
const editForm = document.querySelector(editPopup).querySelector('.popup__form');

export { confirmPopupSelector, editPhotoButton, changePhotoPopup, cardsBlock, editPopup, addPopup, params, editForm, editButton, addButton };
