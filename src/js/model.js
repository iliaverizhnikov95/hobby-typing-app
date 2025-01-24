import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  quote: {
    text: 'test',
    author: 'test',
    id: '1333',
  },
  typingMode: {
    modeToggle: false,
    punctationToggle: false,
    wordCount: 10,
  },
  words: [],
  bookmarks: [],
};

// Single Quote Mode Handling

/**
 * Returns string with capital letters at the beginning and in some required cases.
 * @param {string} data - Lower case sting.
 * @returns {string} - Capitalised string with dot.
 */

const capitalLettersQuote = function (data) {
  const capLettersQuote = data.split('.').map(str => {
    if (str === '') {
      return;
    }

    const words = str.trim().split(' ');

    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    words.forEach((word, i) => {
      if (
        word === 'i' ||
        word === "i'm" ||
        word === "i've" ||
        word === "i'll"
      ) {
        words[i] = word[0].toUpperCase() + word.slice(1);
      }
    });

    return words.join(' ');
  });

  return capLettersQuote.join('. ');
};

const createQuoteObject = function (data) {
  return {
    text: capitalLettersQuote(data.quote.toLowerCase()).trim(),
    author: data.author,
    id: data.id,
  };
};

/**
 * Loads a random or specific quote using the API.
 * @param {string} id - In case of loading a specific quote, it gets the ID, or uses the default value ('random/') to loading random quote.
 * @returns {object} - Object with quote text, author and ID. 
 */

const quoteLoader = async function (id = 'random/') {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSingleQuote = async function (id) {
  try {
    const data = await quoteLoader(id);
    state.quote = createQuoteObject(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Words Mode Handling

/**
 * Shuffles elements from the received Array.
 * @param {object[]} arr - An array containing words.
 * @param {Number} wordCount - Specified number of words.
 * @returns 
 */

function getRandomElements(arr, wordCount) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, wordCount);
}

/**
 * Depending on the punctationToggle parameter, it starts creating a set of words in lowercase, or a set of words with punctuation.
 * @param {Number} wordCount - Specified number of words. 
 * @param {boolean} punctationToggle - If false (default) creating words without punctation, true - words with punctuation.
 */

export const loadWords = async function (wordCount, punctationToggle) {
  try {
    if (!punctationToggle) {
      state.quote = await createWordsObject(wordCount);
    } else if (punctationToggle) {
      state.quote = await createPunctationWordsObject(wordCount);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Creates a set of words in lowercase.
 * @param {Number} wordCount - Specified number of words. 
 * @returns {object} - Object with empty value in author and ID keys, only set of words in text key.
 */

const createWordsObject = async function (wordCount) {
  try {
    const words = [];
    state.words = [];
    while (state.words.length < 50) {
      const data = await quoteLoader(`random/7`);

      data.map(obj => {
        const wordsArr = obj.quote.match(/\w+/g);
        wordsArr.forEach(word => {
          if (word.length > 1) state.words.push(word.toLowerCase());
        });
      });
    }

    const setWords = new Set(words);
    setWords.forEach(word => state.words.push(word));

    let result = '';

    for (let i = 0; i < wordCount; i++) {
      result = result.concat(state.words[i] + ' ');
    }

    return {
      text: result.trim(),
      author: '',
      id: '',
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * Creates a set of words with punctation.
 * @param {Number} wordCount - Specified number of words.
 * @returns {object} - Object with empty value in author and ID keys, only set of words in text key.
 */

const createPunctationWordsObject = async function (wordCount) {
  try {
    const words = [];
    state.words = [];
    while (state.words.length < 50) {
      const data = await quoteLoader(`random/6`);

      data.map(obj => {
        const wordsArr = obj.quote.split(' ');
        wordsArr.forEach(word => {
          word = word[0].toUpperCase() + word.slice(1);
          words.push(word);
        });
      });

      const setWords = new Set(words);
      setWords.forEach(word => state.words.push(word));
    }

    const rendomWords = getRandomElements(state.words, wordCount);

    let result = '';

    for (let i = 0; i < wordCount; i++) {
      result = result.concat(rendomWords[i] + ' ');
    }

    return {
      text: `${result.trim()}.`,
      author: '',
      id: '',
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Favourite Quote Hadling

export const getFavouriteQuotes = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

const persistFavouriteQuote = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addFavouriteQuote = function () {
  const storage = state.bookmarks;
  const quote = [];

  if (storage.length === 0) {
    state.bookmarks.push(state.quote);
    persistFavouriteQuote();
  }

  quote.push(...storage.map(q => q.id === state.quote.id));

  if (quote.includes(true)) return;
  else {
    state.bookmarks.push(state.quote);
    persistFavouriteQuote();
  }
};

export const removeFavouriteQuote = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  persistFavouriteQuote();
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
