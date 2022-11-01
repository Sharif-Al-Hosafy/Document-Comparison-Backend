const router = require("express").Router();
const { getAllcompanies, insertCompany } = require("./company.controller");

router.route("/").get(getAllcompanies).post(insertCompany);

module.exports = router;
