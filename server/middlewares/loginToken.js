require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createLoginToken = (email,id, role) => {
  return jwt.sign({ email, id, role }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};