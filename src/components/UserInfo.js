export class UserInfo {
  constructor({ name, activities }) {
    this._name = name;
    this._activities = activities;
  }

  getUserInfo() {
    return {
      name: this._name,
      activities: this._activities
    };
  }

  rerenderUserInfo() {
    document.querySelector('.profile__name').textContent = this._name;
    document.querySelector('.profile__activities').textContent = this._activities;
  }

  setUserInfo(name, activities) {
    this._name = name;
    this._activities = activities;
    this.rerenderUserInfo();
  }
}
