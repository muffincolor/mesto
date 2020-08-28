export class UserInfo {
  constructor({ profileNameSelector, profileActivitiesSelector }) {
    this._nameSelector = profileNameSelector;
    this._activitiesSelector = profileActivitiesSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      activities: this._activitiesSelector.textContent
    };
  }

  setUserInfo(name, activities) {
    this._nameSelector.textContent = name;
    this._activitiesSelector.textContent = activities;
  }
}
