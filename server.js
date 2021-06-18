require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const {
  getTutorialData,
  getTestData,
  promoteWord,
  demoteWord,
  learnWord,
  incrementSession,
  addLog,
} = require("./src/getData");

const TEST_USER_ID = `a0c6cb0d-37a2-48a4-b84f-2ed46c4b9e1a`;

app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

app.get("/tutorial", async (req, res) => {
  incrementSession(TEST_USER_ID);
  const tutorialData = await getTutorialData();

  res.json({
    data: tutorialData,
  });
});

app.post("/tutorial/learn", async (req, res) => {
  const wordId = req.body.id;

  learnWord(wordId);
  addLog({
    wordId,
    userId: TEST_USER_ID,
    action: "learn",
  });

  res.json({
    status: true,
  });
});

app.get("/test", async (req, res) => {
  const testData = await getTestData();

  res.json({
    data: testData,
  });
});

app.post("/test/promote", async (req, res) => {
  const wordId = req.body.id;

  promoteWord(wordId);
  addLog({
    wordId,
    userId: TEST_USER_ID,
    action: "promote",
  });

  res.json({
    status: true,
  });
});

app.post("/test/demote", async (req, res) => {
  const wordId = req.body.id;

  demoteWord(wordId);
  addLog({
    wordId,
    userId: TEST_USER_ID,
    action: "demote",
  });

  res.json({
    status: true,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
