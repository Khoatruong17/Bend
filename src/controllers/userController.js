const UserS = require("../services/customerService");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields name, email, password" });
    }
    const data = await UserS.createUserService(name, email, password);
    return res.status(200).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.log(">> Error from createNewUser (Controller): ", error);
    return res
      .status(500)
      .json({ error: ">> Error from createNewUser (Controller): ", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields email, password" });
    }

    const user = await User.find({ email: email });
    if (!user) {
      return res.status(404).json({
        EC: 1,
        EM: "Email or Password is incorrect!",
      });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      return res.status(404).json({
        EC: 1,
        EM: "Email or Password is incorrect!",
      });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      data,
    });
  } catch (error) {
    console.log(">> Error from loginUser (Controller): ", error);
    return res
      .status(500)
      .json({ error: ">> Error from loginUser (Controller): ", error });
  }
};

module.exports = {
  createNewUser,
  loginUser,
};
