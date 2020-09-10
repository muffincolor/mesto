export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  setData(data) {
    this._renderItems = data;
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, isArray) {
    if(isArray) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
