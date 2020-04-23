const mongoose = require("mongoose");
const dayjs = require("dayjs");

const FavoriteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  isLoved: {
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goods: { type: mongoose.Schema.Types.ObjectId, ref: "Goods", required: true }
});

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);

module.exports = FavoriteModel;
