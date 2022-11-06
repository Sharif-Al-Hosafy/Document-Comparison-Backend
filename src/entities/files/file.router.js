const router = require("express").Router();
const {
  uploadFile,
  addNewFileToDb,
  deleteFile,
  updateFile,
  getLatestFiles,
} = require("./file.controller");

router.route("/").post(addNewFileToDb).get(getLatestFiles);
router.route("/upload").post(uploadFile); // upload file to the server
router.route("/:id").patch(updateFile).delete(deleteFile);
module.exports = router;
