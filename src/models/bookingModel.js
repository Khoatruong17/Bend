const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    totalPrice: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
