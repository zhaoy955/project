const dayjs = require("dayjs");
const Comment = require("../model/comment.model");

const service = {
  findCommentCount(condition) {
    return Comment.countDocuments({
      ...condition,
      isDeleted: false
    }).exec();
  },
  findComment(condition, { pageSize, pageNum }) {
    return Comment.find({
      ...condition,
      isDeleted: false
    })
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize)
      .populate("user", ["username", "profile"])
      .populate({
        path: "goods",
        populate: { path: "user" }
      })
      .exec();
  },
  deleteComment(condition) {
    return Comment.findOneAndUpdate(condition, {
      $set: { isDeleted: true, updatedAt: dayjs().valueOf() }
    }).exec();
  },
  findAndUpdate(condition, doc) {
    return Comment.findOneAndUpdate(
      condition,
      {
        $set: {
          ...doc,
          updatedAt: dayjs().valueOf()
        }
      },
    ).exec();
  }
};

module.exports = service;
