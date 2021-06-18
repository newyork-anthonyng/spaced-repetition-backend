const {
  getCardsSheet,
  getUsersSheet,
  saveRow,
  addLog,
} = require("./googleSheet");

const TEST_USER_ID = `a0c6cb0d-37a2-48a4-b84f-2ed46c4b9e1a`;

const MAX_TEST_CARD_COUNT = 10;
const MAX_TUTORIAL_CARD_COUNT = 5;

async function getUser(id) {
  const rows = await getUsersSheet();

  const user = rows.find((row) => {
    return row.ID === id;
  });

  if (!user) {
    return null;
  }

  return user;
}

async function incrementSession(id) {
  const user = await getUser(id);

  if (!user) {
    return null;
  }

  user.Session = +user.Session + 1;
  saveRow(user);
}

function getCandidateCards(totalCards, session) {
  const studiedRows = totalCards.filter((row) => {
    return !!row.studied;
  });

  // separate cards by bucket
  const useBox1 = true;
  const useBox2 = session % 3 === 0;
  const useBox3 = session % 5 === 0;

  const box1 = studiedRows.filter((row) => {
    return row.box == 1;
  });
  const box2 = studiedRows.filter((row) => {
    return row.box == 2;
  });
  const box3 = studiedRows.filter((row) => {
    return row.box == 3;
  });

  let result = [];
  if (useBox3) {
    shuffle(box3);
    box3.forEach((item) => result.push(item));
  }

  if (useBox2) {
    shuffle(box2);
    box2.forEach((item) => result.push(item));
  }

  if (useBox1) {
    shuffle(box1);
    box1.forEach((item) => result.push(item));
  }

  return result.slice(0, MAX_TEST_CARD_COUNT);
}

async function getTestData() {
  let rows = await getCardsSheet();
  rows = rows.map((row, index) => {
    return {
      id: row.ID,
      answer: row.Text,
      audio: row.Audio,
      index,
      studied: row.Studied,
      box: row.Box,
    };
  });
  const user = await getUser(TEST_USER_ID);

  if (!user) {
    return;
  }

  const session = +user.Session;

  const cards = getCandidateCards(rows, session);

  const result = cards.map((datum) => {
    const choices = shuffle(getRandom(rows, 4, datum));

    return {
      id: datum.id,
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

  const unstudiedRows = rows
    .filter((row) => {
      return !row.Studied;
    })
    .slice(0, MAX_TUTORIAL_CARD_COUNT);

  const tutorialRows = unstudiedRows.map((row) => {
    return {
      id: row.ID,
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

async function learnWord(id) {
  const word = await getWord(id);

  if (!word) {
    return;
  }

  word.Studied = "Y";
  saveRow(word);
}

module.exports = {
  getTutorialData,
  getTestData,
  promoteWord,
  demoteWord,
  learnWord,
  incrementSession,
  addLog,
};
