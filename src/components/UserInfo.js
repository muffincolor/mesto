export class UserInfo {
  constructor({ profileNameSelector, profileActivitiesSelector, profileImageSelector, id }) {
    this._nameSelector = profileNameSelector;
    this._activitiesSelector = profileActivitiesSelector;
    this._imageSelector = profileImageSelector;
    this._id = id;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      activities: this._activitiesSelector.textContent,
      id: this._id
    };
  }

  setUserID(id) {
    this._id = id;
  }

  setUserInfo(name, activities) {
    this._nameSelector.textContent = name;
    this._activitiesSelector.textContent = activities;
  }

  setUserImage(src) {
    this._imageSelector.src = src;
  }
}
