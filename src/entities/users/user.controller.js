const User = require("./users.model");
const createError = require("../../utils/errors/error.module");

const getAllusers = async (req, res) => {
  const users = await User.allUsers();
  res.status(200).json(users);
};

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    throw createError(400, "Please fill the required fields");
  const savedHash = await User.getPassword(name); // get user's password
  const newHash = await User.hash(password); // hash the plain text
  if (savedHash[0].password !== newHash[0].password)
    throw createError(403, "Password is incorrect");

  res.status(200).json(name);
};

module.exports = {
  getAllusers,
  login,
};
