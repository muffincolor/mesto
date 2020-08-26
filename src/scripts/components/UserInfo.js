export class UserInfo {
  constructor({ name, activities }) {
    this._name = name;
    this._activities = activities;
  }

  getUserInfo() {
    return {
      name: document.querySelector('.profile__name').textContent,
      activities: document.querySelector('.profile__activities').textContent
    };
  }

  setUserInfo() {
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__activities').textContent = this._activities;
  }
}
