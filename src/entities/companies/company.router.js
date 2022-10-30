const router = require("express").Router();
const { getAllcompanies } = require("./company.controller");

router.route("/").get(getAllcompanies);

module.exports = router;
