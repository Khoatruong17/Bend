const UserS = require("../services/customerService");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      EC: 0,
      EM: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

module.exports = {
  getAllUsers,
};
