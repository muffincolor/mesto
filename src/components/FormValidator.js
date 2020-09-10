export default class FormValidator {
  constructor(data, form) {
    this._params = data;
    this._form = form;
    this._inactiveButtonClass = this._params['inactiveButtonClass'];
    this._inputSelector = this._params['inputSelector']
    this._submitButton = this._form.querySelector(this._params['submitButtonSelector']);
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector))

    this._form.addEventListener('submit', function (evt) {
      setTimeout(() => {
        evt.preventDefault();
      }, 10);
    });

    this._setEventListeners();
  }

  _setEventListeners() {
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
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
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
