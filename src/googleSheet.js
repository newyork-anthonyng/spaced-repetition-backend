const { GoogleSpreadsheet } = require("google-spreadsheet");
const secret = require("../secret-key.json");

const GOOGLE_SHEET_ID = `1pz6lCE9LMUJWkfwCdwxvzV2lLGjAM3DDJDIqZXi8Rz4`;

async function getMainSheet() {
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth(secret);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  return sheet.getRows();
}

module.exports = {
  getMainSheet,
};
