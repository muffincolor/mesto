function enableValidation(params) {
  const formList = Array.from(document.querySelectorAll(params['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, params);
  });
}

function setEventListeners(formElement, params) {
  const inputList =  Array.from(formElement.querySelectorAll(params['inputSelector']));
  const submitButtonSelector = formElement.querySelector(params['submitButtonSelector']);
  toggleButtonState(inputList, submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, params);
      toggleButtonState(inputList, submitButtonSelector);
    });
  });
}

function toggleButtonState(inputList, submitButtonSelector) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add('popup__button_status_inactive');
  } else {
    submitButtonSelector.classList.remove('popup__button_status_inactive');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, params) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
}

function hideInputError(formElement, inputElement, params) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(params['inputErrorClass']);
  errorElement.classList.remove(params['errorClass']);
  errorElement.textContent = '';
}

function showInputError(formElement, inputElement, errorMessage, params) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(params['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params['errorClass']);
}
