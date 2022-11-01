const Company = require("./company.model");
const createError = require("../../utils/errors/error.module");

const getAllcompanies = async (req, res) => {
  const companies = await Company.getAllCompanies();
  res.status(200).json(companies);
};

const insertCompany = async (req, res) => {
  const { name } = req.body;
  if (!name) throw createError(400, "Please Add Company Name");
  const company = await Company.insertNewCompany();
  res.status(200).json(company);
};

module.exports = {
  getAllcompanies,
  insertCompany,
};
