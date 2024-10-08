const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    propertie_id: { type: mongoose.Schema.Types.ObjectId, ref: "Properties" },
    nameofRoom: { type: String },
    roomNumber: { type: String },
    amanities: { type: [String] },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
