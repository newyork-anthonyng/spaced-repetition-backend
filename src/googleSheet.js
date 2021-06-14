const { GoogleSpreadsheet } = require("google-spreadsheet");

const GOOGLE_SHEET_ID = `1pz6lCE9LMUJWkfwCdwxvzV2lLGjAM3DDJDIqZXi8Rz4`;

async function getCardsSheet() {
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEET_EMAIL,
    private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY,
  });
  await doc.loadInfo();

  // const sheet = doc.sheetsByIndex[0];
  const sheet = doc.sheetsByTitle["cards"];

  return sheet.getRows();
}

async function saveRow(row) {
  await row.save();
}

async function getUsersSheet() {
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SHEET_EMAIL,
    private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY,
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByTitle["user"];

  return sheet.getRows();
}

module.exports = {
  getCardsSheet,
  getUsersSheet,
  saveRow,
};
