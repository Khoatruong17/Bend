const commentModel = require("../models/commentModel");

const getAllComments = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EC: 1,
      EM: error.message,
    });
  }
};

const createNewComment = async (req, res) => {
  try {
    const { comment, user_id } = req.body;
    if (!comment) {
      res.status(200).json({
        EC: 1,
        EM: "Comment not found! Please enter your comment !!!",
      });
    }
    const newComment = new commentModel({ comment, user_id });
    await newComment.save();
    res.status(200).json({
      EC: 0,
      EM: "Comment created",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EC: 1,
      EM: error.message,
    });
  }
};

module.exports = {
  getAllComments,
  createNewComment,
};
