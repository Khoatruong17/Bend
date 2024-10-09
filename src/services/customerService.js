const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    let result = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "null",
    });
    return result;
  } catch (error) {
    console.log(">> Error from createUserService: ", error);
    return res
      .status(500)
      .json({ error: ">> Error from createUserService: ", error });
  }
};

module.exports = {
  createUserService,
};
