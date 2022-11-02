const router = require("express").Router();
const { uploadFile, addNewFileToDb } = require("./file.controller");

router.route("/").post(addNewFileToDb);
router.route("/upload").post(uploadFile); // upload file to the server

module.exports = router;
