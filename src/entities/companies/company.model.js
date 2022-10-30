const sql = require("../..//utils/connection/db"); // connection to db

const Company = (company) => {
  this.name = company.name;
};

Company.getAllCompanies = async () => {
  const result = sql.query("select * from marketing.company");
  return result;
};

module.exports = Company;
