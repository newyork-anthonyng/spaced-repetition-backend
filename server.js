require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const {
  getTutorialDataFromSpreadsheet,
  getTestDataFromSpreadsheet,
} = require("./src/getData");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());

app.get("/tutorial", async (req, res) => {
  const tutorialData = await getTutorialDataFromSpreadsheet();

  res.json({
    data: tutorialData,
  });
});

app.get("/test", async (req, res) => {
  const testData = await getTestDataFromSpreadsheet();

  res.json({
    data: testData,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
