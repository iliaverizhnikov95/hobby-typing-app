import View from './View.js';

import icons from '../../img/icons.svg';

class FavouriteQuoteView extends View {
  _parentElement = document.querySelector('.favourite-quote--list');
  _btn_open_quate = document.querySelector('.btn--open-quote');
  _btn_close_quate = document.querySelector('.btn--close-quote');
  _modal_quate = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _timeoutValue = 250;
  
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

  // Quote modal handling

  toggleModal() {
    this._modal_quate.classList.toggle('modal-open');
    this._overlay.classList.toggle('overlay-visible');
  }

  addHandlerShowQuoteModal() {
    this._btn_open_quate.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandlerHideQuoteModal() {
    this._btn_close_quate.addEventListener(
      'click',
      this.toggleModal.bind(this)
    );

    this._overlay.addEventListener(
      'click',
      function () {
        if (this._modal_quate.classList.contains('modal-open')) {
          this.toggleModal();
          console.log('Yep');
        }
      }.bind(this)
    );
  }

  // Favourit quotes handling

  addHandlerRenderFavouriteQuote(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--favourite-quote');

        if (target) {
          handler(target.dataset.id1);
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

  _generateMarkup() {
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
