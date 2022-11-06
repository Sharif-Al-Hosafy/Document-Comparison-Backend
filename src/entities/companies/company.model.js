const sql = require("../..//utils/connection/db"); // connection to db

const Company = {};

Company.getCompanyId = async (companyName) => {
  const result = sql.query(
    `select id from marketing.company where companyName='${companyName}'`
  );
  return result;
};

Company.getAllCompanies = async () => {
  const result = sql.query("select * from marketing.company");
  return result;
};

Company.insertNewCompany = async (companyName) => {
  const result = sql.query(
    `insert into marketing.company (companyName) values ('${companyName}') `
  );
  return result;
};

module.exports = Company;
