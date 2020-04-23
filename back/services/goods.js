const dayjs = require("dayjs");
const Goods = require("../model/goods.model");

const service = {
  findOne(condition) {
    return Goods.findOne({ ...condition, isDeleted: false })
      .populate("user", ["username", "profile"])
      .exec();
  },
  findGoodsCount(condition) {
    return Goods.countDocuments({
      ...condition,
      isDeleted: false
    }).exec();
  },
  findGoods(condition, { pageSize, pageNum }) {
    return Goods.find({
      ...condition,
      isDeleted: false
    })
      .limit(pageSize)
      .skip((pageNum - 1) * pageSize)
      .populate("user", ["username", "profile"])
      .exec();
  },
  deleteGoods(condition) {
    return Goods.findOneAndUpdate(condition, {
      $set: { isDeleted: true, updatedAt: dayjs().valueOf() }
    }).exec();
  },
  findAndUpdate(condition, doc) {
    return Goods.findOneAndUpdate(
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
