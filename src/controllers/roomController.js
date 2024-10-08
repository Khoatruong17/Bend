const Room = require("../models/roomModel");
const propertiesModel = require("../models/propertiesModel");

const createRoom = async (req, res) => {
  try {
    const { propertie_id, nameofRoom, roomNumber, amanities, status } =
      req.body;

    const findProperties = await propertiesModel.findById({ propertie_id });
    if (!findProperties) {
      return res.status(404).json({ message: "Property not found" });
    }

    const newRoom = new Room({
      propertie_id,
      nameofRoom,
      roomNumber,
      amanities,
      status,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const roomBeforeUpdate = await Room.findById(id);
    if (!roomBeforeUpdate) {
      return res.status(404).json({ message: "Room not found" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    const hasUpdates = Object.keys(updates).some(
      (key) => roomBeforeUpdate[key] !== updatedRoom[key]
    );

    if (!hasUpdates) {
      return res.status(400).json({ message: "No updates made to the room" });
    }

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
