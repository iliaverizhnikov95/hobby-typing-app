import View from './View.js';
import icons from '../../img/icons.svg';

class ColourScheme extends View {
  _parentElement = document.querySelector('.typing-test--container');
  _timeoutValue = 100;
  _errorMessage = 'We could not load your test. Please reload the page!';

  _rootElement = document.querySelector(':root');

  setColourScheme(vars = {}) {
    Object.entries(vars).forEach(v =>
      this._rootElement.style.setProperty(v[0], v[1])
    );
  }
}

export default new ColourScheme();
