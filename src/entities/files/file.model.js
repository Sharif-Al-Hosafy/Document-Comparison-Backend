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

File.isFileExist = async (companyId, fileName, date) => {
  const file = sql.query(
    `select id from marketing.file where name='${fileName}' and file_date = '${date}' and company_id = '${companyId[0].id}' `
  );
  return file;
};

module.exports = File;
