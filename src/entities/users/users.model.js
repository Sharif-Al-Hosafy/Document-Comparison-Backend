const sql = require("../../utils/connection/db");

const User = {};

User.allUsers = async () => {
  const users = sql.query(`select name from marketing.users;`);
  return users;
};

User.getPassword = async (name) => {
  const hash = sql.query(
    `select password from marketing.users where name = '${name}' `
  );
  return hash;
};

User.hash = async (plainText) => {
  const result = sql.query(
    `SELECT CONCAT('*', UPPER(SHA1(UNHEX(SHA1('${plainText}'))))) as password`
  );
  return result;
};

module.exports = User;
