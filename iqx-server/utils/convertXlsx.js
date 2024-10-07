const xlsx = require("xlsx");

function convertToNestedJson() {
  const workbook = xlsx.readFile(`${process.cwd()}/food_safety_data.xlsx`);
  const sheetName = workbook.SheetNames[0]; // Assuming first sheet
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  return data;
}

module.exports = convertToNestedJson();
