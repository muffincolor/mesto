let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let submit = document.querySelector('.popup__submit-button');
let newName = document.querySelector('.popup__input_type_name');
let newActivities = document.querySelector('.popup__input_type_activities');

let profileName = document.querySelector('.profile__name');
let profileActivities = document.querySelector('.profile__activities');

let closePopupBtn = document.querySelector('.popup__close-btn');

function togglePopup() {
  popup.classList.toggle('popup__active');
}

editButton.addEventListener('click', function () {
  togglePopup();
});

submit.addEventListener('click', function () {
  profileName.textContent = newName.value;
  profileActivities.textContent = newActivities.value;
  togglePopup();
});

closePopupBtn.addEventListener('click', function () {
  togglePopup();
});
