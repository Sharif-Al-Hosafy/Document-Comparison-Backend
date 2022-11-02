const Company = require("../companies/company.model"); // for extracting company id
const File = require("./file.model");
const formidable = require("formidable");
const fs = require("fs/promises");

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
  const data = await fs.readFile("./uploads/المكاتبة.pdf", {
    encoding: "base64",
  }); // save pdf to db in base64

  const companyId = await Company.getCompanyId(companyName); // get company name

  const fileToDatabase = await File.insertNewFile(
    fileName,
    data,
    date,
    companyId
  );

  res.status(201).json({ Message: "Success" });
};

//

module.exports = { uploadFile, addNewFileToDb };
