const sql = require("../..//utils/connection/db"); // connection to db

const Company = {};

Company.getAllCompanies = async () => {
  const result = sql.query("select * from marketing.company");
  return result;
};

module.exports = Company;
