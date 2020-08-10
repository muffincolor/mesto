class FormValidator {
  constructor(data, form) {
    this._params = data;
    this._form = form;
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners(this._form);
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._params['inputSelector']));
    const submitButtonSelector = formElement.querySelector(this._params['submitButtonSelector']);
    this._toggleButtonState(inputList, submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, submitButtonSelector);
      });
    });
  }

  _toggleButtonState(inputList, submitButtonSelector) {
    if (this._hasInvalidInput(inputList)) {
      submitButtonSelector.classList.add('popup__button_status_inactive');
    } else {
      submitButtonSelector.classList.remove('popup__button_status_inactive');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._params['inputErrorClass']);
    errorElement.classList.remove(this._params['errorClass']);
    errorElement.textContent = '';
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._params['inputErrorClass']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._params['errorClass']);
  }
}

export { FormValidator };
