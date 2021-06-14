const { getCardsSheet, getUsersSheet, saveRow } = require("./googleSheet");

async function incrementSession(id) {
  const rows = await getUsersSheet();

  const user = rows.find((row) => {
    return row.ID === id;
  });

  if (!user) {
    return null;
  }

  user.Session = +user.Session + 1;
  saveRow(user);
}

async function getTestData() {
  const rows = await getCardsSheet();

  const data = rows.map((row, index) => {
    return {
      answer: row.Text,
      audio: row.Audio,
      index,
    };
  });

  const result = data.map((datum) => {
    const choices = shuffle(getRandom(data, 4, datum));

    return {
      answer: datum.answer,
      audio: datum.audio,
      choices,
    };
  });

  return result;
}

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
function getRandom(arr, n, includedElement) {
  const result = [];
  const length = arr.length;
  const taken = {};

  result.push(includedElement.answer);
  taken[includedElement.index] = true;
  n--;

  while (n > 0) {
    const randomIndex = Math.floor(Math.random() * length);
    const alreadyUsed = taken[randomIndex];
    if (!alreadyUsed) {
      result.push(arr[randomIndex].answer);
      taken[randomIndex] = true;
      n--;
    }
  }

  return result;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function getTutorialData() {
  const rows = await getCardsSheet();

  const unstudiedRows = rows.filter((row) => {
    return !row.Studied;
  });

  const tutorialRows = unstudiedRows.map((row) => {
    return {
      text: row.Text,
      audio: row.Audio,
    };
  });

  return tutorialRows;
}

async function getWord(id) {
  const rows = await getCardsSheet();

  const word = rows.find((row) => {
    return row.ID === id;
  });

  if (!word) {
    return null;
  }

  return word;
}

async function promoteWord(id) {
  const word = await getWord(id);

  if (!word) {
    return;
  }

  switch (word.Box) {
    case "1":
      word.Box = "2";
      break;
    case "2":
      word.Box = "3";
      break;
    case "3":
    default:
      break;
  }

  saveRow(word);
}

async function demoteWord(id) {
  const word = await getWord(id);

  if (!word) {
    return;
  }

  switch (word.Box) {
    case "3":
      word.Box = "2";
      break;
    case "2":
      word.Box = "1";
      break;
    case "1":
    default:
      break;
  }

  saveRow(word);
}

module.exports = {
  getTutorialData,
  getTestData,
  promoteWord,
  demoteWord,
  incrementSession,
};
