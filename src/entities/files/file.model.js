const sql = require("../..//utils/connection/db"); // connection to db

const File = {};
const allData = {};

File.insertNewFile = async (fileName, fileData, fileDate, companyId) => {
  var query = "INSERT INTO marketing.file SET ?",
    values = {
      name: fileName,
      file_data: fileData,
      file_date: fileDate,
      company_id: companyId[0].id,
    };
  const result = sql.query(query, values);

  return result;
};

module.exports = File;
