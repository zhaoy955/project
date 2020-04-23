const dayjs = require("dayjs");
const Favorite = require("../model/favorite.model");

const service = {
  findOne(condition) {
    return Favorite.findOne({ ...condition, isDeleted: false }).exec();
  },
  findFavoriteCount(condition) {
    return Favorite.countDocuments({
      ...condition,
      isDeleted: false
    }).exec();
  },
  findFavorite(condition, { pageSize, pageNum }) {
    return Favorite.find({
      ...condition,
      isDeleted: false
    })
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize)
      .populate({
        path: "goods",
        populate: { path: "user" }
      })
      .populate("user", ["username", "profile"])
      .exec();
  },
  deleteFavorite(condition) {
    return Favorite.findOneAndUpdate(condition, {
      $set: { isDeleted: true, updatedAt: dayjs().valueOf() }
    }).exec();
  },
  findAndUpdate(condition, doc) {
    return Favorite.findOneAndUpdate(condition, {
      $set: {
        ...doc,
        updatedAt: dayjs().valueOf()
      }
    }).exec();
  }
};

module.exports = service;
