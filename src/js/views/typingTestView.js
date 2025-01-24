import View from './View.js';

import icons from '../../img/icons.svg';

class TypingView extends View {
  _parentElement = document.querySelector('.typing-test--container');
  _timeoutValue = 100;
  _errorMessage = 'We could not load your test. Please reload the page!';
  _successMessage = 'Congretulation!!! Choose your next step...'
  
  addHandlerReloadTest(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--reload');

        if (target) {
          handler();
        }
      }.bind(this)
    );
  }

  addHandlerTextComparison(handler) {
    this._parentElement.addEventListener(
      'input',
      function (e) {
        const targetText = e.target.closest('.input-field');
        const comparisonText = this._data.text;
        
        if (targetText) {
          if (comparisonText === targetText.value) {
            handler(this._successMessage);
          } else if (comparisonText.startsWith(targetText.value)) {
            targetText.classList.remove('incorrect');
          } else {
            targetText.classList.add('incorrect');
          }
        }
      }.bind(this)
    );
  }

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
