export default class FormValidator {
  constructor(data, form) {
    this._params = data;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      setTimeout(() => {
        evt.preventDefault();
      }, 10);
    });

    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._params['inputSelector']));
    this._submitButtonSelector = this._form.querySelector(this._params['submitButtonSelector']);
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonSelector.classList.add('popup__button_status_inactive');
      this._submitButtonSelector.disabled = true;
    } else {
      this._submitButtonSelector.classList.remove('popup__button_status_inactive');
      this._submitButtonSelector.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._params['inputErrorClass']);
    errorElement.classList.remove(this._params['errorClass']);
    errorElement.textContent = '';
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._params['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params['errorClass']);
  }
}
