const mongoose = require("mongoose");
const dayjs = require("dayjs");

const CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    default: ""
  },
  reply: {
    type: String,
    default: ""
  },
  createdAt: {
    type: String,
    default: dayjs().valueOf()
  },
  updatedAt: {
    type: String,
    default: dayjs().valueOf()
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goods: { type: mongoose.Schema.Types.ObjectId, ref: "Goods", required: true }
});

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
