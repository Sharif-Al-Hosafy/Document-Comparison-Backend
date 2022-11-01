const sql = require("../..//utils/connection/db"); // connection to db

const Company = {};

Company.getAllCompanies = async () => {
  const result = sql.query("select * from marketing.company");
  return result;
};

Company.insertNewCompany = async (name) => {
  const result = sql.query(
    `insert into marketing.company (name) values ('${name}') `
  );
  return result;
};

module.exports = Company;
