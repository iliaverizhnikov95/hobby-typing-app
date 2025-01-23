import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  quote: {
    text: 'test',
    author: 'test',
    id: '1333',
  },
  typingMode: {
    testToggle: false,
    punctationToggle: false,
    wordCount: 10,
  },
  words: [],
  bookmarks: [],
};

const createQuoteObject = function (data) {
  return {
    text: capitalLettersQuote(data.quote.toLowerCase()).trim(),
    author: data.author,
    id: data.id,
  };
};

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

    // console.log(state.quote);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadWords = async function (count, index) {
  try {
    // console.log(index);
    if (!index) {
      state.quote = await createWordsObject(count);
    } else if (index) {
      state.quote = await createPunctationWordsObject(count);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createWordsObject = async function (count = 10) {
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

    for (i = 0; i < count; i++) {
      result = result.concat(state.words[i] + ' ');
    }
    // console.log(result.trim());

    return {
      text: result.trim(),
      author: '',
      id: '',
    };

    // console.log(state.words);
    // console.log(state.words[0]);
    // console.log(state.words.length);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
// loadMultipleQuotes();

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

const createPunctationWordsObject = async function (count = 10) {
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

    const rendomWords = getRandomElements(state.words, count);

    let result = '';

    for (i = 0; i < count; i++) {
      result = result.concat(rendomWords[i] + ' ');
    }

    return {
      text: `${result.trim()}.`,
      author: '',
      id: '',
    };

    // console.log(state.words);
    // console.log(state.words[0]);
    // console.log(state.words.length);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Favourite Quote

export const getBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  // console.log(state.bookmarks);
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addFavouriteQuote = function () {
  const storage = state.bookmarks;
  const quote = [];

  if (storage.length === 0) {
    state.bookmarks.push(state.quote);
    persistBookmarks();
  }

  quote.push(...storage.map(q => q.id === state.quote.id));

  if (quote.includes(true)) return;
  else {
    state.bookmarks.push(state.quote);
    persistBookmarks();
  }
};

export const removeFavouriteQuote = function (id) {
  // Delete bookmark
  console.log(id);
  const index = state.bookmarks.findIndex(el => el.id === id);
  console.log(index);
  state.bookmarks.splice(index, 1);
  console.log(state.bookmarks);

  persistBookmarks();
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
