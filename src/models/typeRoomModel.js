const mongoose = require("mongoose");

const typeRoomSchema = new mongoose.Schema(
  {
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Properties" },
    images: { type: [String] },
    typeOfRoom: { type: String },
    roomNumber: { type: String },
    amenities: { type: [String] },
    price: { type: Number },
    status: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("typeRoom", typeRoomSchema);
