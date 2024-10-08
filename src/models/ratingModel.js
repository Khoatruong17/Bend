const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    user_rated: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    comment: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
