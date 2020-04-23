const mongoose = require("mongoose");
const router = require("koa-router")();
const verify = require("../middleware/verify");

const Services = require("../services");
const FavoriteModel = require("../model/favorite.model");

const { Favorite } = Services;

router.get("/api/favorite", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { pageSize = 10, pageNum = 1 } = request.query;
  const condition = { user: _id };

  const findFavorite = await Favorite.findFavorite(condition, {
    pageSize: +pageSize,
    pageNum: +pageNum
  });
  const count = await Favorite.findFavoriteCount(condition);

  ctx.body = {
    code: 1,
    data: findFavorite,
    pageSize,
    pageNum,
    count,
    message: "success"
  };
});

router.delete(
  "/api/favorite/:id",
  verify(["admin", "user"]),
  async (ctx, next) => {
    const { request, response, params } = ctx;
    const { id } = params;
    const resp = await Favorite.deleteFavorite({ _id: id });

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
  }
);

router.put("/api/favorite", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { goodsId } = request.body;
  const resp = await Favorite.findAndUpdate(
    { user: _id, goods: goodsId },
    request.body
  );

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

router.post("/api/favorite", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { goodsId } = request.body;

  const hasFavorite = await Favorite.findOne({
    goods: goodsId, // link goods
    user: _id // link user
  });

  if (hasFavorite) {
    const resp = await Favorite.findAndUpdate(
      { user: _id, goods: goodsId },
      { isLoved: true }
    );
    ctx.body = {
      code: 1,
      data: resp,
      message: "success"
    };
    return;
  }

  const newFavorite = new FavoriteModel({
    _id: mongoose.Types.ObjectId(),
    goods: goodsId, // link goods
    user: _id // link user
  });
  const resp = await newFavorite.save();
  if (resp) {
    ctx.body = {
      code: 1,
      data: newFavorite,
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: {},
      message: "Error while saving Favorite"
    };
  }
});

module.exports = router;
