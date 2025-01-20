import View from './View.js';

import icons from '../../img/icons.svg';

class TypingModeView extends View {
  _parentElement = document.querySelector('.typing-mode--container');
  _typingTestContainer = document.querySelector('.typing-test--container');
  _btnWord = document.querySelector('.btn--type-words');
  _btnQuote = document.querySelector('.btn--type-quote');
  _punctation = document.querySelector('.punctation');
  _counter = document.querySelector('.counter');
  _wordToggle = false;
  _punctationToggle = 0;
  _wordCount = 10;
  _timeoutValue = 100;
  _errorMessage =
    'We could not generate the set of words. Please reload the page!';

  // TODO
  // 1) Refactore this 2 Handler functions to one function use (addHandlerTypingMode):
  //    a) toggles instead add, remove
  //    b) this._wordToggle = !this._wordToggle;
  //    c) takes target as a argument
  //    d) make it remember previous settings after reload

  getData(data) {
    this._data = data;
  }

  addHandlerQuoteMode(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--type-quote');
        if (target && this._wordToggle === true) {
          target.classList.add('active');
          this._btnWord.classList.remove('active');
          this._punctation.classList.add('shrinking');
          this._counter.classList.add('shrinking');
          this._wordToggle = false;
          handler('random/', this._wordToggle);
        }
      }.bind(this)
    );
  }

  addHandlerWordMode(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--type-words');
        if (target && this._wordToggle === false) {
          target.classList.add('active');
          this._btnQuote.classList.remove('active');
          this._punctation.classList.remove('shrinking');
          this._counter.classList.remove('shrinking');
          this._wordToggle = true;
          handler(this._wordCount, this._punctationToggle);
        }
      }.bind(this)
    );
  }

  addHandlerWordCounter(handler) {
    this._counter.addEventListener(
      'click',
      function (e) {
        // e.preventDefault();

        if (
          e.target.classList.contains('count') &&
          !e.target.classList.contains('active')
        ) {
          e.currentTarget.querySelectorAll('.count').forEach(child => {
            child.classList.remove('active');
          });
          this._wordCount = +e.target.dataset.count;
          e.target.classList.add('active');
          handler(this._wordCount, this._punctationToggle);

          // console.log('button', e.target, e.currentTarget);
          // console.log(+e.target.dataset.count);
        }
      }.bind(this)
    );
  }

  addHandlerRenderRendomQuote(handler) {
    this._typingTestContainer.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--reload');

        if (target && !this._wordToggle) {
          handler();
        }
      }.bind(this)
    );
  }

  addHandlerRenderWords(handler) {
    this._typingTestContainer.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--reload');

        if (target && this._wordToggle) {
          handler(this._wordCount, this._punctationToggle);
        }
      }.bind(this)
    );
  }

  addHandlerWordsPunctation(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--punctation');

        if (target && this._punctationToggle === 0) {
          target.classList.add('active');
          this._punctationToggle = 1;
          handler(this._wordCount, this._punctationToggle);
        } else if (target && this._punctationToggle === 1) {
          target.classList.remove('active');
          this._punctationToggle = 0;
          handler(this._wordCount, this._punctationToggle);
        }
      }.bind(this)
    );
  }

  // Comparison typing text

  addHandlerSuccessResult(handler) {
    this._typingTestContainer.addEventListener(
      'input',
      function (e) {
        const targetText = e.target.closest('.input-field');
        const comparisonText = this._data.text;

        if (targetText) {
          if (comparisonText === targetText.value) {
            handler(this._wordToggle);
          } else if (comparisonText.startsWith(targetText.value)) {
            targetText.classList.remove('incorrect');
          } else {
            targetText.classList.add('incorrect');
          }
        }
      }.bind(this)
    );
  }
}

export default new TypingModeView();
