import * as model from './model.js';
import typingTestView from './views/typingTestView.js';
import modalView from './views/CVModalView.js';
import successResultView from './views/successResultView.js';
import typingModeView from './views/typingModeView.js';
import favouriteQuoteView from './views/favouriteQuoteView.js';
import colourSchemeView from './views/colorSchemeView.js';
import colorCollection from '../css/colorCollection.js';

const state = model.state;

/**
 * Depends on modeToggle controls the test rendering process. If modeToggle set to false it starts execution of loading and rendering single quote, if true - starts execution of loading and rendering set of words.
 * @param {string} id - In case of loading a specific quote, it gets the ID, or uses the default value ('random/') to loading random quote.
 */

const controlTypingTest = async function (id) {
  try {
    const mode = state.typingMode;

    // 1) Clearing container
    typingTestView.fadeOut();

    // 2) Loading test
    if (mode.modeToggle) {
      await model.loadWords(mode.wordCount, mode.punctationToggle);
    } else if (!mode.modeToggle) {
      await model.loadSingleQuote(id);
    }

    // 3) Rendering test
    typingTestView.render(state.quote);
    typingModeView.getData(state);
  } catch (err) {
    console.error(err);
    typingTestView.renderError(err);
  }
};
controlTypingTest();

const controlTestMode = function (modeToggle, punctationToggle, wordCount) {
  // Setting up the configuration of test mode
  state.typingMode.modeToggle = modeToggle;
  state.typingMode.punctationToggle = punctationToggle;
  state.typingMode.wordCount = wordCount;
  controlTypingTest();
};

const controlSuccessResult = function (message) {
  successResultView.fadeOut();
  successResultView.render(state.typingMode.modeToggle, message);
};

const controlRenderPreviousTest = function () {
  typingTestView.fadeOut();
  typingTestView.render(state.quote);
};

const controlAddFavouriteQuote = function (message) {
  successResultView.fadeOut();
  model.addFavouriteQuote();
  favouriteQuoteView.render(state.bookmarks);
  successResultView.render(true, message);
};

const controlLoadFavouriteQuotes = function () {
  model.getFavouriteQuotes();
  favouriteQuoteView.render(state.bookmarks);
};
controlLoadFavouriteQuotes();

const controlRenderFavouriteQuote = function (id) {
  state.typingMode.modeToggle = false;
  typingModeView.setDefaultMode();
  controlTypingTest(id);
  favouriteQuoteView.toggleModal();
};

const controlRemoveFavouriteQuote = function (id) {
  model.removeFavouriteQuote(id);
  favouriteQuoteView.render(state.bookmarks);
};

const init = function () {
  typingTestView.addHandlerReloadTest(controlTypingTest);
  typingModeView.addHandlerQuoteMode(controlTestMode);
  typingModeView.addHandlerWordsMode(controlTestMode);
  typingModeView.addHandlerWordsCounter(controlTestMode);
  typingModeView.addHandlerWordsPunctation(controlTestMode);
  typingTestView.addHandlerTextComparison(controlSuccessResult);
  successResultView.addHandlerRenderPreviousTest(controlRenderPreviousTest);
  successResultView.addHandlerAddFavouriteQuote(controlAddFavouriteQuote);
  favouriteQuoteView.addHandlerRenderFavouriteQuote(
    controlRenderFavouriteQuote
  );
  favouriteQuoteView.addHandlerRemoveFavouriteQuote(
    controlRemoveFavouriteQuote
  );
  favouriteQuoteView.addHandlerShowQuoteModal();
  favouriteQuoteView.addHandlerHideQuoteModal();
};
init();
