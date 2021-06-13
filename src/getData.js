const { getMainSheet } = require("./googleSheet");

async function getTestDataFromSpreadsheet() {
  const rows = await getMainSheet();

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

async function getTutorialDataFromSpreadsheet() {
  const rows = await getMainSheet();

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

module.exports = {
  getTutorialDataFromSpreadsheet,
  getTestDataFromSpreadsheet,
};
