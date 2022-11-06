const Company = require("./company.model");
const createError = require("../../utils/errors/error.module");

const getAllcompanies = async (req, res) => {
  const companies = await Company.getAllCompanies();
  res.status(200).json(companies);
};

const insertCompany = async (req, res) => {
  let { companyName } = req.body;
  if (!companyName) throw createError(400, "Please Add Company Name");

  companyName = companyName.trimStart().trimEnd(); // remove all unnecessary spaces

  const isCompanyExist = await Company.getCompanyId(companyName); // if there is an id then the company is already inserted before
  if (isCompanyExist.length > 0)
    throw createError(400, "This Company Already Exists");

  const company = await Company.insertNewCompany(companyName);
  res.status(200).json(company);
};

module.exports = {
  getAllcompanies,
  insertCompany,
};
