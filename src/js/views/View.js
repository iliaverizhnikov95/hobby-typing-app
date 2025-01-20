import icons from '../../img/icons.svg';

export default class View {
  _data;
  _timeoutValue;

  render(data) {
    this._data = data;
    // const markup = this._generateMarkup;
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

  addHandlerRenderRendomQuote(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--reload');

      if (target) {
        handler();
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon--alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._fadeIn();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

// renderSpinner() {
//   const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;
//   this._clear();
//   this._parentElement.insertAdjacentHTML('afterbegin', markup);
// }
