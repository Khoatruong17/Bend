const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    userComment_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    availability: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);
