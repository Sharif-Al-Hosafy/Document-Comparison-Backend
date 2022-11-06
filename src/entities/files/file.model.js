const sql = require("../..//utils/connection/db"); // connection to db

const File = {};

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

File.getByIdAndUpdate = async (queryObj, fileId) => {
  var query = ` update marketing.file SET ? where id=${fileId}`,
    values = queryObj;
  const result = sql.query(query, values);
  return result;
};

File.getLatestFiles = async () => {
  const file = sql.query(
    `select f.name,f.file_date,c.name from marketing.file f join marketing.company c on f.company_id = c.id order by f.id desc limit 10; `
  );
  return file;
};

File.deleteFile = async (fileId) => {
  const file = sql.query(`delete from marketing.file where id = ${fileId}; `);
  return file;
};

module.exports = File;
