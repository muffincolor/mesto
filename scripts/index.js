const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

createElements();

function createElements() {
  initialCards.forEach(function (cardInfo) {
    placeElementOnPage(renderElement(cardInfo.name, cardInfo.link));
  });

  registerLikeButton();
  registerDeleteButton();
  registerClickOnImage();
}

function renderElement(name, link) {
  const elemntTemplate = document.querySelector('#element-template').content;
  const newElement = elemntTemplate.cloneNode(true);


  newElement.querySelector('.element__info').querySelector('.element__title').textContent = name;
  newElement.querySelector('.element__photo').src = link;

  return newElement;
}

function placeElementOnPage(element) {
  const elementsBlock = document.querySelector('.elements');
  elementsBlock.prepend(element);
}

function registerLikeButton() {
  document.querySelector('.elements').addEventListener('click', likeElement);
}

function likeElement(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    evt.target.classList.toggle('element__like-button_status_active');
  }
}

function registerDeleteButton() {
  document.querySelector('.elements').addEventListener('click', deleteElement);
}

function deleteElement(evt) {
  if (evt.target.classList.contains('element__delete-button')) {
    evt.target.closest('.element').remove();
  }
}

function registerClickOnImage() {
  document.querySelector('.elements').addEventListener('click', showImagePopup);
}

function isPopupExists() {
  return document.querySelector('.popup') !== null;
}

function isPopupActive() {
  return document.querySelector('.popup').classList.contains('popup_active');
}

function isActionButton(target) {
  let isAction = false;
  if (target.classList.contains('element__like-button') || target.classList.contains('element__delete-button')) {
    isAction = true;
  }
  return isAction;
}

function togglePopup() {
  const popup = document.querySelector('.popup');
  if (!popup.classList.contains('popup_active')) {
    popup.classList.toggle('popup_active');
  } else {
    popup.classList.toggle('popup_active');
    setTimeout(function () {
      popup.remove();
    }, 400);
  }
}

function closePopupByOverlay() {
  document.querySelector('.popup').addEventListener('click', function (evt) {
    if (evt.target.classList[0].startsWith('popup__')) {
      return;
    } else {
      togglePopup();
    }
  });
}

function closePopupByEscape() {
  document.addEventListener('keydown', function (evt) {
    if (evt.key.toLowerCase() === 'escape' && isPopupExists() && isPopupActive()) {
      togglePopup();
    }
  });
}

function closePopupByCloseButton() {
  document.querySelector('.popup__close-btn').addEventListener('click', togglePopup);
}









addActionsOnProfileButtons();

function addActionsOnProfileButtons() {
  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');

  editButton.addEventListener('click', renderEditPopup); // Редактировать профиль
  addButton.addEventListener('click', renderAddPlacePopup); // Добавить место
}

function renderEditPopup() {
  if (isPopupExists()) {
    document.querySelector('.popup').remove();
  }

  const profileName = document.querySelector('.profile__name');
  const profileActivities = document.querySelector('.profile__activities');

  const popupTemplate = document.querySelector('#popup-edit-profile').content;
  const newPopup = popupTemplate.cloneNode(true);
  newPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';

  newPopup.querySelector('.popup__input_type_name').placeholder = 'Жак-Ив-Кусто';
  newPopup.querySelector('.popup__input_type_name').value = profileName.textContent;

  newPopup.querySelector('.popup__input_type_activities').placeholder = 'Исследователь океана';
  newPopup.querySelector('.popup__input_type_activities').value = profileActivities.textContent;

  placePopupOnPage(newPopup);
}

function renderAddPlacePopup() {
  if (isPopupExists()) {
    document.querySelector('.popup').remove();
  }

  const popupTemplate = document.querySelector('#popup-add-place').content;
  const newPopup = popupTemplate.cloneNode(true);

  newPopup.querySelector('.popup__title').textContent = 'Новое место';

  newPopup.querySelector('.popup__input_type_name').placeholder = 'Название';
  newPopup.querySelector('.popup__input_type_activities').placeholder = 'Ссылка на картинку';

  newPopup.querySelector('.popup__submit-button').value = 'Создать';

  placePopupOnPage(newPopup);
}

function showImagePopup(evt) {
  if (isPopupExists()) {
    document.querySelector('.popup').remove();
  } else if (isActionButton(evt.target)) {
    return;
  }

  const element = evt.target.closest('.element');
  const popupTemplate = document.querySelector('#popup-image').content;
  const newPopup = popupTemplate.cloneNode(true);


  newPopup.querySelector('.popup__image').src = element.querySelector('.element__photo').src;
  newPopup.querySelector('.popup__caption').textContent = element.querySelector('.element__title').textContent;

  placePopupOnPage(newPopup);
}

function placePopupOnPage(popup) {
  document.querySelector('.page').prepend(popup);

  closePopupByCloseButton();
  closePopupByOverlay();
  closePopupByEscape();
  enableValidation();

  setTimeout(function () {
    togglePopup();
  }, 2);
}

function setupActionOnSubmitForEditForm(popupForm) {
  modifyProfile(popupForm.elements.name.value, popupForm.elements.activities.value);
  togglePopup();
}

function setupActionOnSubmitForAddForm(popupForm) {
  placeElementOnPage(renderElement(popupForm.elements.title.value, popupForm.elements.url.value));
  togglePopup();

  registerLikeButton();
  registerDeleteButton();
  registerClickOnImage();
}

function setupActionOnSubmitError(popupForm) {
  alert('Ошибка');
}
