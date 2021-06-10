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

const testData = [
  {
    audio: "audio/box.m4a",
    answer: "Box",
    choices: shuffle(["Box", "Day", "No", "Pig"]),
  },
  {
    audio: "audio/book.m4a",
    answer: "Book",
    choices: shuffle(["Box", "Day", "No", "Book"]),
  },
  {
    audio: "audio/day.m4a",
    answer: "Day",
    choices: shuffle(["Day", "Box", "No", "Pig"]),
  },
  {
    audio: "audio/people.m4a",
    answer: "People",
    choices: shuffle(["People", "Box", "No", "Pig"]),
  },
  {
    audio: "audio/no.m4a",
    answer: "No",
    choices: shuffle(["No", "Day", "Pig", "Box"]),
  },
  {
    audio: "audio/some.m4a",
    answer: "Some",
    choices: shuffle(["Some", "Day", "Pig", "Box"]),
  },
  {
    audio: "audio/pig.m4a",
    answer: "Pig",
    choices: shuffle(["Pig", "No", "Toy", "Box"]),
  },
  {
    audio: "audio/which.m4a",
    answer: "Which",
    choices: shuffle(["Pig", "No", "Toy", "Which"]),
  },
  {
    audio: "audio/toy.m4a",
    answer: "Toy",
    choices: shuffle(["Toy", "And", "Box", "Pig"]),
  },
  {
    audio: "audio/your.m4a",
    answer: "Your",
    choices: shuffle(["Your", "And", "People", "Pig"]),
  },
];

const tutorialData = [
  {
    audio: "audio/book.m4a",
    text: "Book",
  },
  {
    audio: "audio/people.m4a",
    text: "People",
  },
  {
    audio: "audio/some.m4a",
    text: "Some",
  },
  {
    audio: "audio/which.m4a",
    text: "Which",
  },
  {
    audio: "audio/your.m4a",
    text: "Your",
  },
];

module.exports = { testData, tutorialData };
