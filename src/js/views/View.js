import icons from '../../img/icons.svg';

export default class View {
  _data;
  _timeoutValue;

  render(data) {
    if(!data) return this.renderError(err);

    this._data = data;
    setTimeout(() => {
      this._clear();
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkup()
      );
      this._fadeIn();
    }, this._timeoutValue);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _fadeIn() {
    this._parentElement.classList.remove('invisible');
  }

  fadeOut() {
    this._parentElement.classList.add('invisible');
  }

  renderError(message) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon--alert-triangle"></use>
          </svg>
        </div>
        <p>${this._errorMessage}<br>${message}</p>
      </div>
    `;
    this._clear();
    this._fadeIn();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}