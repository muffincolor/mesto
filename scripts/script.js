let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let submit = document.querySelector('.popup__submit-button');
let newName = document.querySelector('.popup__input_type_name');
let newActivities = document.querySelector('.popup__input_type_activities');

let profileName = document.querySelector('.profile__name');
let profileActivities = document.querySelector('.profile__activities');

let closePopupBtn = document.querySelector('.popup__close-btn');


function togglePopup() {
  if (!popup.classList.contains('popup_active')) {
    newName.value = profileName.textContent;
    newActivities.value = profileActivities.textContent;
  }
  popup.classList.toggle('popup_active');
}


editButton.addEventListener('click', function () {
  togglePopup();
});

closePopupBtn.addEventListener('click', function () {
  togglePopup();
});



let formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = document.querySelector('.popup__input_type_name');
  let newActivities = document.querySelector('.popup__input_type_activities');

  let profileName = document.querySelector('.profile__name');
  let profileActivities = document.querySelector('.profile__activities');


  profileName.textContent = newName.value;
  profileActivities.textContent = newActivities.value;

  togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);