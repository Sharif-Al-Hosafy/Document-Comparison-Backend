const Company = require("./company.model");

const getAllcompanies = async (req, res) => {
  const companies = await Company.getAllCompanies();
  res.status(200).json(companies);
};

module.exports = {
  getAllcompanies,
};
