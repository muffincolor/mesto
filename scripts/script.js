const initialCards = [
  {
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
const elemtsBlock = document.querySelector('.elements');

function parseArray(array) {
  array.forEach(function(item) {
    createElement(item.link, item.name);
  });
}

parseArray(initialCards);


// Блок кода, отвечающий за регистрацию событий на кнопках
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', function (evt) {
  setupPopups(evt.target);
}); // Редактировать профиль

addButton.addEventListener('click', function (evt) {
  setupPopups(evt.target);
}); // Добавить место

// -------------------------------

// Функция отвечающая за создание, настройку элементов/карточек

function createElement(imageLink, elementTitle) {
  const elemntTemplate = document.querySelector('#element-template').content;

  const newElement = elemntTemplate.cloneNode(true);

  newElement.querySelector('.element__photo').src = imageLink;

  newElement.querySelector('.element__info').querySelector('.element__title').textContent = elementTitle;

  newElement.querySelector('.element').addEventListener('click', function(evt) {
    showImage(evt.target);
  });

  newElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });

  newElement.querySelector('.element__like-button').addEventListener('click', addLike);

  elemtsBlock.prepend(newElement);
}


// Функция отвечающая за создание, настройку и регулировку попапов
const profileName = document.querySelector('.profile__name');
const profileActivities = document.querySelector('.profile__activities');

function setupPopups(target) {
  const popupTemplate = document.querySelector('#popup-template').content;
  if(document.querySelector('.popup') !== null) {
    document.querySelector('.popup').remove();
  }

  const newPopup = popupTemplate.cloneNode(true);

  if (target.classList.contains('profile__add-button')) {
    newPopup.querySelector('.popup__title').textContent = 'Новое место';

    newPopup.querySelector('.popup__input_type_name').placeholder = 'Название';
    newPopup.querySelector('.popup__input_type_activities').placeholder = 'Ссылка на картинку';

    newPopup.querySelector('.popup__submit-button').value = 'Создать';
  } else if (target.classList.contains('profile__edit-button')){
    newPopup.querySelector('.popup__title').textContent = 'Редактировать профиль';

    newPopup.querySelector('.popup__input_type_name').placeholder = 'Жак-Ив-Кусто';
    newPopup.querySelector('.popup__input_type_name').value = profileName.textContent;

    newPopup.querySelector('.popup__input_type_activities').placeholder = 'Исследователь океана';
    newPopup.querySelector('.popup__input_type_activities').value = profileActivities.textContent;
  } else {
    alert('Error');
  }

  document.querySelector('.page').prepend(newPopup);

  document.querySelector('.popup__close-btn').addEventListener('click', function (evt) {
    togglePopup();
  });

  document.querySelector('.popup__form').addEventListener('submit', formSubmitHandler);

  togglePopup();
}


// Функция отвечающая за определение конкретного попапа и создание нужных для него инструкция
function formSubmitHandler(evt) {
  evt.preventDefault();
  console.log();

  if (document.querySelector('.popup__title').textContent === 'Новое место') { // Определяем в каком именно попапе мы находимся
    createElement(document.querySelector('.popup__input_type_name').value, document.querySelector('.popup__input_type_activities').value);
  } else {
    modifyProfile(document.querySelector('.popup__input_type_name').value, document.querySelector('.popup__input_type_activities').value);
  }

  togglePopup();
}

// Функция отвечающая за внесение изменений в профиль
function modifyProfile(newName, newActivities) {
  profileName.textContent = newName;
  profileActivities.textContent = newActivities;
}

// Активация и отключение попапа
function togglePopup() {
  let popup = document.querySelector('.popup');

  if(popup.classList.contains('popup_active')) {
    popup.classList.toggle('popup_active');
    popup.classList.toggle('popup_disabled');
  } else {
    popup.classList.toggle('popup_active');
  }
}


function addLike(evt) {
  evt.target.classList.toggle('element__like-button_status_active');
}

function showImage(target) {
  if(document.querySelector('.popup') !== null) {
    document.querySelector('.popup').remove();
  }
  if(target.classList.contains('element__like-button') || target.classList.contains('element__delete-button')) {
    return;
  }

  const element = target.closest('.element');

  const popupTemplate = document.querySelector('#popup-image').content;
  const newPopup = popupTemplate.cloneNode(true);

  console.log(newPopup);

  newPopup.querySelector('.popup__image').src = element.querySelector('.element__photo').src;
  newPopup.querySelector('.popup__caption').textContent = element.querySelector('.element__title').textContent;

  newPopup.querySelector('.popup__close-btn').addEventListener('click', function (evt) {
    evt.target.closest('.popup').remove();
  });

  document.querySelector('.page').prepend(newPopup);

  togglePopup();
}