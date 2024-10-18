const UserS = require("../services/customerService");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Missing required fields name, email, password" });
    }

    //check user exits
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        EC: 1,
        EM: "Email already exists",
      });
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
      return res.status(200).json({
        EC: 1,
        EM: "Email or Password is incorrect!",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        EC: 1,
        EM: "Email or Password is incorrect!",
      });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
      return res.status(200).json({
        EC: 1,
        EM: "Email or Password is incorrect!",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.username,
      role: user.role,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res.status(200).json({
      EC: 0,
      EM: "User logged in successfully",
      access_token,
      userId: user._id,
      role: user.role,
      name: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(">> Error from loginUser (Controller): ", error);
    return res.status(500).json({
      EC: 1, // Error code indicating failure
      EM: "An unexpected error occurred. Please try again later.",
    });
  }
};

const getAccount = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  createNewUser,
  loginUser,
  getAccount,
};
