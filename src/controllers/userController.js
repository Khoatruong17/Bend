const UserS = require("../services/customerService");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    users.forEach((user) => {
      if (user.password) {
        throw new Error("User data includes password!");
      }
    });

    res.status(200).json({
      EC: 0,
      EM: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    throw new Error("Error retrieving users", error);
  }
};

const getUsers = (req, res) => {};

module.exports = {
  getAllUsers,
};
