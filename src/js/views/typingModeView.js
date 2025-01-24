import View from './View.js';
import { DEFAULT_COUNT } from '../config.js';

class TypingModeView extends View {
  _parentElement = document.querySelector('.typing-mode--container');
  _btnWord = document.querySelector('.btn--type-words');
  _btnQuote = document.querySelector('.btn--type-quote');
  _punctation = document.querySelector('.punctation');
  _counter = document.querySelector('.counter-panel');
  _modeToggle = false;
  _punctationToggle = false;
  _wordCount = DEFAULT_COUNT;

  getData(data) {
    this._data = data;
  }

  setDefaultMode() {
    this._btnWord.classList.remove('active');
    this._btnQuote.classList.add('active');
    this._punctation.classList.add('shrink');
    this._counter.classList.add('shrink');
    this._modeToggle = false;
  }

  activeModeButtonToggling(target) {
    target.classList.toggle('active');
    this._punctation.classList.toggle('shrink');
    this._counter.classList.toggle('shrink');
  }

  addHandlerQuoteMode(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--type-quote');
        if (target && this._modeToggle === true) {
          this.activeModeButtonToggling(target);
          this._btnWord.classList.toggle('active');
          this._modeToggle = false;
          handler(this._modeToggle, this._punctationToggle, this._wordCount);
        }
      }.bind(this)
    );
  }

  addHandlerWordsMode(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--type-words');
        if (target && this._modeToggle === false) {
          this.activeModeButtonToggling(target);
          this._btnQuote.classList.toggle('active');
          this._modeToggle = true;
          handler(this._modeToggle, this._punctationToggle, this._wordCount);
        }
      }.bind(this)
    );
  }

  addHandlerWordsCounter(handler) {
    this._counter.addEventListener(
      'click',
      function (e) {
        if (
          e.target.classList.contains('count') &&
          !e.target.classList.contains('active')
        ) {
          e.currentTarget.querySelectorAll('.count').forEach(child => {
            child.classList.remove('active');
          });
          this._wordCount = +e.target.dataset.count;
          e.target.classList.add('active');
          handler(this._modeToggle, this._punctationToggle, this._wordCount);
        }
      }.bind(this)
    );
  }

  addHandlerWordsPunctation(handler) {
    this._parentElement.addEventListener(
      'click',
      function (e) {
        const target = e.target.closest('.btn--punctation');

        if (target && !this._punctationToggle) {
          target.classList.add('active');
          this._punctationToggle = true;
          handler(this._modeToggle, this._punctationToggle, this._wordCount);
        } else if (target && this._punctationToggle) {
          target.classList.remove('active');
          this._punctationToggle = false;
          handler(this._modeToggle, this._punctationToggle, this._wordCount);
        }
      }.bind(this)
    );
  }
}

export default new TypingModeView();
