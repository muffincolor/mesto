function enableValidation() {
  const formsList = Array.from(document.querySelectorAll('.popup__form'));
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();

      switch(evt.target.closest('.popup').querySelector('.popup__title').textContent) {
        case 'Новое место':
          setupActionOnSubmitForAddForm(formElement);
          break;
        case 'Редактировать профиль':
          setupActionOnSubmitForEditForm(formElement);
          break;
        default:
          setupActionOnSubmitError(formElement);
      }
    });

    setEventListeners(formElement);
  });
}

function modifyProfile(newName, newActivities) {
  const profileName = document.querySelector('.profile__name');
  const profileActivities = document.querySelector('.profile__activities');

  profileName.textContent = newName;
  profileActivities.textContent = newActivities;
}

function setEventListeners(formElement) {
  const inputList =  Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_status_inactive');
  } else {
    buttonElement.classList.remove('popup__submit-button_status_inactive');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}
