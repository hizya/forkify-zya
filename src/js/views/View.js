import icon from 'url:../../img/icons.svg';

export default class View {
  _data; //property
  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
      <use href="${icon}#icon-loader"></use>
    </svg>
    </div>
  `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render the receive object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} VIew instance
   * @author ZhangYuang
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderError(errMsg = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icon}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${errMsg}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icon}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newELements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newELements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // update the text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
}
