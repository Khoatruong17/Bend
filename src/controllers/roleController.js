const Role = require("../models/roleModel");

const createRole = async (req, res) => {
  try {
    const { role, description } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "Role is required ",
      });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const existingRole = await Role.findOne({ role });
    if (existingRole) {
      return res.status(400).json({
        message: "Role already exists",
      });
    }

    // Tạo role mới
    const newRole = new Role({
      role,
      description,
    });
    await newRole.save();

    return res.status(200).json({
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  createRole,
};
