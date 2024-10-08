const mongoose = require("mongoose");

const PropertiesSchema = new mongoose.Schema(
  {
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String },
    images: { type: [String] },
    amanities: { type: [String] },
    location: { type: Object, required: true }, // Assuming GeoJSON
    availability: { type: Boolean },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Properties", PropertiesSchema);
