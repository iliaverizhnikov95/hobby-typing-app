import View from './View.js';

import icons from '../../img/icons.svg';

class FavouriteQuoteView extends View {
  _parentElement = document.querySelector('.favourite-quote--list');
  _timeoutValue = 250;
  _errorMessage = 'We could not load this favuorite quote. Please reload the page and try again!';
  

  addHandlerRenderFavouriteQuote(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--favourite-quote');

        if (target) {
          handler(target.dataset.id);
        }
      }.bind(this)
    );
  }

  addHandlerRemoveFavouriteQuote(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--remove-favourite-quote');

        if (target) {
          handler(+target.dataset.id);
        }
      }.bind(this)
    );
  }

  render(data) {
    this._clear();

    data.map(d => {
      this._data = d;
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkup()
      );
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    return `
      <li class="favourite-quote">
        <button class="btn btn--favourite-quote" data-id="${this._data.id}">
          <div class="favourite--text-field">
          ${this._data.text}
          </div>
          <div class="favourite--author-field">${this._data.author}</div>
        </button>
        <button
          class="btn btn--remove-favourite-quote"
          data-id="${this._data.id}"
          title="remove"
        >
          <svg class="icon icon--trash">
            <use href="${icons}#icon--trash"></use>
          </svg>
        </button>
      </li>
    `;
  }
}

export default new FavouriteQuoteView();
