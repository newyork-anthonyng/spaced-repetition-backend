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
  incrementSession,
} = require("./src/getData");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());

app.get("/tutorial", async (req, res) => {
  const TEST_ID = `a0c6cb0d-37a2-48a4-b84f-2ed46c4b9e1a`;
  incrementSession(TEST_ID);
  const tutorialData = await getTutorialData();

  res.json({
    data: tutorialData,
  });
});

app.get("/test", async (req, res) => {
  const testData = await getTestData();

  res.json({
    data: testData,
  });
});

app.post("/promote", async (req, res) => {
  const wordId = req.body.id;

  promoteWord(wordId);

  res.json({
    status: true,
  });
});

app.post("/demote", async (req, res) => {
  const wordId = req.body.id;

  demoteWord(wordId);

  res.json({
    status: true,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
