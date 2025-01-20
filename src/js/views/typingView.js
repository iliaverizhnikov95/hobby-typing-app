import View from './View.js';

import icons from '../../img/icons.svg';

class TypingView extends View {
  _parentElement = document.querySelector('.typing-test--container');
  _timeoutValue = 100;
  _errorMessage = 'We could not load the quote. Please reload the page!';

  _generateMarkup() {
    return `
  <div class="quote">
    <div class="text-field">${this._data.text}
    <div class="author-field">${this._data.author}</div>
    </div>
    </div>
    <div class="input">
      <textarea
        class="input-field"
        type="text"
        spellcheck="false"
        placeholder="Start typing the quote..."
      ></textarea>
      <div>
        <button class="btn btn--reload btn-tooltip" aria-label="Reload">
          <svg class="icon icon-reloader">
            <use href="${icons}#icon-reloader"></use>
          </svg>
          <span class="tooltip">Restart</span>
        </button>
      </div>
    </div>
  </div>
  `;
  }
}

export default new TypingView();
