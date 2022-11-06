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
  const { companyName, fileName, fileDate } = req.body; // date
  if (!companyName || !fileName || !fileDate)
    throw createError(400, "Company Name, File Name or date are missing");

  const companyId = await Company.getCompanyId(companyName); // get company id

  const isFileExist = await File.isFileExist(companyId, fileName, fileDate);
  if (isFileExist.length > 0)
    throw createError(400, "This File Already Exists");

  const fileData = await fs.readFile("./uploads/" + fileName, {
    encoding: "base64",
  }); // save pdf to db in base64
  if (!fileData) throw createError(400, "No File Found");

  const fileToDatabase = await File.insertNewFile(
    fileName,
    fileData,
    fileDate,
    companyId
  );

  res.status(201).json({ Message: "Success" });
};

const updateFile = async (req, res) => {
  // get body elements
  const { fileName, fileDate, companyName } = req.body;
  const queryObj = {};

  if (fileName) {
    queryObj.fileName = fileName;

    const fileData = await fs.readFile("./uploads/" + fileName, {
      encoding: "base64",
    });
    if (!fileData) throw createError(400, "No File Found");
    queryObj.fileData = fileData;
  }

  if (fileDate) queryObj.fileDate = fileDate;

  /// company id change on company name
  if (companyName) {
    const companyId = await Company.getCompanyId(companyName); // get company id
    queryObj.companyId = companyId[0].id;
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
