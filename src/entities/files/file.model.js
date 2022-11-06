const sql = require("../..//utils/connection/db"); // connection to db

const File = {};

File.insertNewFile = async (fileName, fileData, fileDate, companyId) => {
  var query = "INSERT INTO marketing.file SET ?",
    values = {
      fileName,
      fileData,
      fileDate,
      companyId: companyId[0].id,
    };
  const result = sql.query(query, values);

  return result;
};

File.isFileExist = async (companyId, fileName, fileDate) => {
  const file = sql.query(
    `select id from marketing.file where fileName='${fileName}' and fileDate = '${fileDate}' and companyId = '${companyId[0].id}' `
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
    `select f.id as id, f.fileName,f.fileDate,c.companyName from marketing.file f join marketing.company c on f.companyId = c.id order by f.id desc limit 10; `
  );
  return file;
};

File.deleteFile = async (fileId) => {
  const file = sql.query(`delete from marketing.file where id = ${fileId}; `);
  return file;
};

module.exports = File;
