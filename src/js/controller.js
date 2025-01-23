import * as model from './model.js';
import typingTestView from './views/typingTestView.js';
import modalView from './views/CVModalView.js';
import successResultView from './views/successResultView.js';
import typingModeView from './views/typingModeView.js';
import favouriteQuoteView from './views/favouriteQuoteView.js';

const controlTypingTest = async function (id) {
  try {
    const mode = model.state.typingMode;
    typingTestView.fadeOut();

    // 1) Loading test
    if (mode.testToggle) {
      await model.loadWords(mode.wordCount, mode.punctationToggle);
    } else if (!mode.testToggle) {
      await model.loadSingleQuote(id);
    }

    // 2) Rendering Typing View
    typingTestView.render(model.state.quote);
    typingModeView.getData(model.state);
  } catch (err) {
    console.error(err);
    typingTestView.renderError(err);
  }
};
controlTypingTest();

const controlTestMode = function (testToggle, punctationToggle, wordCount) {
  model.state.typingMode.testToggle = testToggle;
  model.state.typingMode.punctationToggle = punctationToggle;
  model.state.typingMode.wordCount = wordCount;
  controlTypingTest();
};

const controlSuccessResult = function () {
  successResultView.fadeOut();

  // 2) Rendering Success View
  successResultView.render(model.state.typingMode.testToggle);
};

const controlRenderPreviousTest = function () {
  typingTestView.fadeOut();
  typingTestView.render(model.state.quote);
};

const controlAddFavouriteQuote = function () {
  model.addFavouriteQuote();
  favouriteQuoteView.render(model.state.bookmarks);
};

const controlLoadFavouriteQuotes = function () {
  model.getBookmarks();
  favouriteQuoteView.render(model.state.bookmarks);
};
controlLoadFavouriteQuotes();

const controlRenderFavouriteQuote = function (id) {
  model.state.typingMode.testToggle = false;
  typingModeView.setDefaultMode();
  controlTypingTest(id);
  favouriteQuoteView.toggleModal();
};

const controlRemoveFavouriteQuote = function (id) {
  model.removeFavouriteQuote(id);
  favouriteQuoteView.render(model.state.bookmarks);
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
