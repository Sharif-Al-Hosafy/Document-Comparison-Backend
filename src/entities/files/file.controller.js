const Company = require("../companies/company.model"); // for extracting company id
const File = require("./file.model");
const formidable = require("formidable");
const fs = require("fs/promises");
const createError = require("../../utils/errors/error.module");

const uploadFile = async (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on("fileBegin", async function (name, file) {
    file.filepath = "./uploads/" + file.originalFilename;
  });

  res.status(201).json({ Message: "Success" });
};

const addNewFileToDb = async (req, res) => {
  const { companyName, fileName, date } = req.body; // date
  if (!companyName || !fileName || !date)
    throw createError(400, "Company Name, File Name or date are missing");

  const companyId = await Company.getCompanyId(companyName); // get company id

  const isFileExist = await File.isFileExist(companyId, fileName, date);
  if (isFileExist.length > 0)
    throw createError(400, "This File Already Exists");

  const data = await fs.readFile("./uploads/" + fileName, {
    encoding: "base64",
  }); // save pdf to db in base64
  if (!data) throw createError(400, "No File Found");

  const fileToDatabase = await File.insertNewFile(
    fileName,
    data,
    date,
    companyId
  );

  res.status(201).json({ Message: "Success" });
};

const updateFile = async (req, res) => {
  // get body elements
  const { name, file_date, company_name } = req.body;
  const queryObj = {};

  if (name) {
    queryObj.name = name;

    const file_data = await fs.readFile("./uploads/" + name, {
      encoding: "base64",
    });
    if (!file_data) throw createError(400, "No File Found");
    queryObj.file_data = file_data;
  }

  if (file_date) queryObj.file_date = file_date;

  /// company id change on company name
  if (company_name) {
    const company_id = await Company.getCompanyId(company_name); // get company id
    queryObj.company_id = company_id[0].id;
  }

  await File.getByIdAndUpdate(queryObj, req.params.id);

  res.status(200).json({ Message: "Success" });
};

const getLatestFiles = async (req, res) => {
  const files = await File.getLatestFiles();
  res.status(200).json(files);
};

const deleteFile = async (req, res) => {
  const deletedFile = await File.deleteFile(req.params.id);
  res.status(200).json(deletedFile);
};

module.exports = {
  uploadFile,
  addNewFileToDb,
  updateFile,
  deleteFile,
  getLatestFiles,
};
