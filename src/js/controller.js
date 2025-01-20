import * as model from './model.js';
import typingView from './views/typingView.js';
import successView from './views/successView.js';
import modalQuote from './views/modalView.js';
import typingModeView from './views/typingModeView.js';
import favouriteQuoteView from './views/favouriteQuoteView.js';

// TypingView controller

const controlTyping = async function (id) {
  try {
    typingView.fadeOut();

    // 1) Loading quote
    await model.loadSingleQuote(id);

    // 2) Rendering Typing View
    typingView.render(model.state.quote);
    typingModeView.getData(model.state.quote);
  } catch (err) {
    console.error(err);
    typingView.renderError();
  }
};
controlTyping();

const controlTypingWords = async function (count, index) {
  try {
    typingView.fadeOut();

    await model.loadWords(count, index);

    typingView.render(model.state.quote);
    typingModeView.getData(model.state.quote);
  } catch (err) {
    console.error(err);
    typingModeView.renderError();
  }
};

const renderFavouriteQuote = async function (id) {
  try {
    typingView.fadeOut();

    // 1) Loading quote
    await model.loadSingleQuote(id);

    // 2) Rendering Typing View
    typingModeView.addHandlerQuoteMode();
    typingView.render(model.state.quote);
    typingModeView.getData(model.state.quote);
  } catch (err) {
    console.error(err);
    favouriteQuoteView.renderError();
  }
};

const controlReloadPreviousText = function () {
  typingView.fadeOut();
  typingView.render(model.state.quote);
  typingModeView.getData(model.state.quote);
};

const controlSuccess = function (toggle) {
  successView.fadeOut();

  // 2) Rendering Success View
  successView.render(toggle);
};

const controlRenderBookmarks = function () {
  model.getBookmarks();
  favouriteQuoteView.render(model.state.bookmarks);
};
controlRenderBookmarks();

const addFavouriteQuote = function () {
  model.addFavouriteQuote();
  favouriteQuoteView.render(model.state.bookmarks);
};

const removeFavouriteQuote = function (id) {
  model.removeFavouriteQuote(id);
  favouriteQuoteView.render(model.state.bookmarks);
};

const init = function () {
  typingModeView.addHandlerRenderRendomQuote(controlTyping);
  typingModeView.addHandlerSuccessResult(controlSuccess);
  typingModeView.addHandlerQuoteMode(controlTyping);
  typingModeView.addHandlerWordMode(controlTypingWords);
  typingModeView.addHandlerWordCounter(controlTypingWords);
  typingModeView.addHandlerRenderWords(controlTypingWords);
  typingModeView.addHandlerWordsPunctation(controlTypingWords);
  successView.addHandlerRenderPreviousText(controlReloadPreviousText);
  successView.addHandlerAddFavouriteQuote(addFavouriteQuote);
  favouriteQuoteView.addHandlerRenderFavouriteQuote(renderFavouriteQuote);
  favouriteQuoteView.addHandlerRemoveFavouriteQuote(removeFavouriteQuote);
};
init();
