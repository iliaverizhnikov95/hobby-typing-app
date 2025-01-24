import View from './View.js';

import icons from '../../img/icons.svg';

class SuccessView extends View {
  _parentElement = document.querySelector('.typing-test--container');
  _timeoutValue = 250;
  _successMessage =
    'Favorite quote successfully added! <br> Choose your next step...';

/**
 * Success Result Screen rendering. Optionally renders the screen for FavouriteQuote success adding.
 * @param {boolean} modeToggle - If false - starts rendering success QuoteTest message and menu, if true - starts rendering success WordsTest message and menu. 
 * @param {string} message - QuoteTest and WordsTest message comes from typingTestView. FavouriteQuote success adding message comes from global scope. 
 */

  render(modeToggle, message) {
    setTimeout(() => {
      this._clear();

      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkup(modeToggle, message)
      );

      this._fadeIn();
    }, this._timeoutValue);
  }

  addHandlerRenderPreviousTest(handler) {
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
          handler(this._successMessage, this._tooltipWord);
        }
      }.bind(this)
    );
  }

  _generateMarkup(modeToggle, message) {
    return `
  <div class="success-container full-width content-grid" style="opacity: 1">
            <div class="success-data--container">
          ${message}
        </div>
        <div class="menu-success">
        <button class="btn btn--reload btn-tooltip" aria-label="next quote">
          <svg class="icon icon--next-quote">
            <use href="${icons}#icon--right-chevron"></use>
          </svg>
          <span class="tooltip">Next</span>
        </button>
        <button class="btn btn--repeat-quote btn-tooltip" aria-label="repeat quote">
          <svg class="icon icon-repeat-quote">
            <use href="${icons}#icon-repeat"></use>
          </svg>
          <span class="tooltip">Repeat</span>
        </button>
        ${!modeToggle ? this._generateMarkupAddQuote() : ''}
      </div>
    </div>
  `;
  }

  _generateMarkupAddQuote() {
    return `
    <button class="btn btn--add-favourite-quote btn-tooltip" aria-label="add to favourite">
        <svg class="icon icon--add-quote">
          <use href="${icons}#icon-close"></use>
        </svg>
        <span class="tooltip">Add to favourite</span>
      </button>`;
  }
}

export default new SuccessView();
