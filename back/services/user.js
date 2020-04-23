const dayjs = require("dayjs");
const User = require("../model/user.model");

const service = {
  findUserCount(condition) {
    return User.countDocuments({
      ...condition,
      isDeleted: false,
      role: "user"
    }).exec();
  },
  findUser(condition, { pageSize, pageNum }) {
    return User.find({
      ...condition,
      role: "user",
      isDeleted: false
    })
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize)
      .exec();
  },
  findOne(condition) {
    return User.findOne({ ...condition, isDeleted: false }).exec();
  },
  deleteUser(condition) {
    return User.findOneAndUpdate(condition, {
      $set: { isDeleted: true, updatedAt: dayjs().valueOf() }
    }).exec();
  },
  findAndUpdate(condition, doc) {
    return User.findOneAndUpdate(
      condition,
      {
        $set: {
          ...doc,
          updatedAt: dayjs().valueOf()
        }
      },
      {
        new: true
      }
    ).exec();
  }
};

module.exports = service;
