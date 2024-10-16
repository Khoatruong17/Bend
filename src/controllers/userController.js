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

const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        EC: 1,
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async () => {
  try {
    const { user } = req.body;
    const updatedUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
      select: "-password",
    });
  } catch (error) {}
};
module.exports = {
  getAllUsers,
  getUsers,
};
