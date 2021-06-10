const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors');

const { testData, tutorialData } = require("./src/testData");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());

app.get("/tutorial", (req, res) => {
  console.log('GET /tutorial');

  res.json({
    data: tutorialData
  });
});

app.get("/test", (req, res) => {
  res.json({
    test: testData,
    tutorial: tutorialData,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
