const mongoose = require("mongoose");
const dayjs = require("dayjs");

const GoodsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String
  },
  number: {
    type: String
  },
  sort: {
    type: String
  },
  origin: {
    type: String
  },
  price: {
    type: Number
  },
  desc: {
    type: String
  },
  image: {
    type: String,
    default: ""
  },
  extra: {
    type: String,
    default: ""
  },
  isSale: {
    type: Boolean,
    default: true
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const GoodsModel = mongoose.model("Goods", GoodsSchema);

module.exports = GoodsModel;
