const router = require("express").Router();
const { getAllusers, login } = require("./user.controller");

router.route("/").get(getAllusers);
router.route("/login").post(login);

module.exports = router;
