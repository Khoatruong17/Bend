const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    booking_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    totalPrice: { type: Number },
    tax: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema);
