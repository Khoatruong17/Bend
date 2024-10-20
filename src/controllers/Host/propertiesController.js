const propertiesModel = require("../../models/propertiesModel");
const userModel = require("../../models/userModel");

const getAllProperties = async (req, res) => {
  try {
    if (!req.user.user_id) {
      return res.status(401).json({
        EC: 1,
        message: "Host ID is required",
      });
    }
    const properties = await propertiesModel.find({
      host_id: req.user.user_id,
    });
    res.status(200).json({
      EC: 0,
      message: "Properties fetched successfully",
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      EC: 2,
      message: error.message,
    });
  }
};

const createProperty = async (req, res) => {
  try {
    if (!req.user.user_id) {
      return res.status(404).json({
        EC: 1,
        message: "Host ID is required",
      });
    }
    const { name, description, amanities, location, availability, status } =
      req.body;

    const user = await userModel.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProperty = new propertiesModel({
      host_id: user._id,
      name,
      description,
      // images: imagesArray,
      amanities,
      location,
      availability,
      status: false,
      isCheck: false,
    });

    await newProperty.save();
    res.status(201).json({
      EC: 0,
      message: `Property ${newProperty.name} created successfully. Your request is processing`,
      data: newProperty,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const propertyBeforeUpdate = await propertiesModel.findById(id);
    if (!propertyBeforeUpdate) {
      return res.status(404).json({ message: "Property not found" });
    }

    const updatedProperty = await propertiesModel.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    const hasUpdates = Object.keys(updates).some(
      (key) => propertyBeforeUpdate[key] !== updatedProperty[key]
    );

    if (!hasUpdates) {
      return res
        .status(400)
        .json({ message: "No updates made to the property" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ params

    // Xóa property với ID đã cho
    const deletedProperty = await propertiesModel.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property deleted successfully",
      data: deletedProperty, // Trả về property đã xóa  trước khi xóa
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};
