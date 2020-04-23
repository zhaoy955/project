const mongoose = require("mongoose");
const router = require("koa-router")();
const verify = require("../middleware/verify");

const Services = require("../services");
const UserModel = require("../model/user.model");
const GoodsModel = require("../model/goods.model");

const { User, Favorite, Goods } = Services;

router.get("/api/goods", async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { public, pageSize = 10, pageNum = 1, sort, title } = request.query;
  const condition = public ? { isSale: true } : { user: _id };

  if (sort) condition.sort = sort;
  if (title) condition.title = title;

  const goods = await Goods.findGoods(condition, {
    pageSize: +pageSize,
    pageNum: +pageNum
  });
  const count = await Goods.findGoodsCount(condition);

  ctx.body = {
    code: 1,
    data: goods,
    pageSize,
    pageNum,
    count,
    message: "success"
  };
});

router.get("/api/goods/:id", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { id: goodsId } = ctx.params;

  const goods = await Goods.findOne({ _id: goodsId });

  if (goods) {
    const favorite = await Favorite.findOne({ goods: goodsId, user: _id });
    const {
      user: { _id: goodUserId }
    } = goods;
    ctx.body = {
      code: 1,
      data: {
        goods,
        isLoved: favorite && favorite.isLoved,
        uid: _id,
        goodsUid: goodUserId
      },
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: null,
      message: "err"
    };
  }
});


router.put("/api/goods/:id", async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;

  const update = request.body;
  const resp = await Goods.findAndUpdate({ _id: id }, update);

  if (resp) {
    ctx.body = {
      code: 1,
      data: resp,
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: {},
      message: "fail"
    };
  }
});

router.delete("/api/goods/:id", async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;
  const resp = await Goods.deleteGoods({ _id: id });

  if (resp) {
    ctx.body = {
      code: 1,
      data: resp,
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: {},
      message: "fail"
    };
  }
});

router.post("/api/goods", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;

  const hasUser = await User.findOne({ _id });

  if (hasUser) {
    const newGoods = new GoodsModel({
      _id: mongoose.Types.ObjectId(),
      ...request.body,
      user: _id // link user
    });
    const resp = await newGoods.save();
    ctx.body = {
      code: 1,
      data: newGoods,
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: {},
      message: "Error while saving Goods Detail"
    };
  }
});

module.exports = router;
