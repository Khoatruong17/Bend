const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (username, email, password) => {
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let result = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "client",
    });
    return result;
  } catch (error) {
    console.log(">> Error from createUserService: ", error);
    return error.message;
  }
};

module.exports = {
  createUserService,
};
