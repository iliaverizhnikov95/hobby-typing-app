import View from './View.js';

import icons from '../../img/icons.svg';

class SuccessView extends View {
  _parentElement = document.querySelector('.typing-test--container');
  _timeoutValue = 250;
  
  render(toggle) {
    
    setTimeout(() => {
      this._clear();
      if(!toggle) {
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkup()
      );
    } else {
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkupWord()
      );
    }
      this._fadeIn();
    }, this._timeoutValue);
  }

  addHandlerRenderPreviousText(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--repeat-quote');

        if (target) {
          handler();
        }
      }.bind(this)
    );
  }

  addHandlerAddFavouriteQuote(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--add-favourite-quote');

        if (target) {
          handler();
        }
      }.bind(this)
    );
  }

  _generateMarkup() {
    return `
  <div class="success-container full-width content-grid" style="opacity: 1">
            <div class="success-data--container">
          Congretulation!!! Choose your next step...
        </div>
        <div class="menu-success">
        <button class="btn btn--reload btn-tooltip" aria-label="next quote">
          <svg class="icon icon--next-quote">
            <use href="${icons}#icon--right-chevron"></use>
          </svg>
          <span class="tooltip">Next quote</span>
        </button>
        <button class="btn btn--repeat-quote btn-tooltip" aria-label="repeat quote">
          <svg class="icon icon--repeat-quote">
            <use href="${icons}#icon--repeat"></use>
          </svg>
          <span class="tooltip">Repeat quote</span>
        </button>
        <button class="btn btn--add-favourite-quote btn-tooltip" aria-label="add to favourite">
          <svg class="icon icon--add-quote">
            <use href="${icons}#icon-close"></use>
          </svg>
          <span class="tooltip">Add to favourite</span>
        </button>
      </div>
    </div>
  `;
  }

  _generateMarkupWord() {
    return `
  <div class="success-container full-width content-grid" style="opacity: 1">
            <div class="success-data--container">
          Congretulation!!! Choose your next step...
        </div>
        <div class="menu-success">
        <button class="btn btn--reload btn-tooltip" aria-label="next quote">
          <svg class="icon icon--next-quote">
            <use href="${icons}#icon--right-chevron"></use>
          </svg>
          <span class="tooltip">Next words</span>
        </button>
        <button class="btn btn--repeat-quote btn-tooltip" aria-label="repeat quote">
          <svg class="icon icon--repeat-quote">
            <use href="${icons}#icon--repeat"></use>
          </svg>
          <span class="tooltip">Repeat words</span>
        </button>
      </div>
    </div>
  `;
  }

}

export default new SuccessView();
