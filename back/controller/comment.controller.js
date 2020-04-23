const mongoose = require("mongoose");
const router = require("koa-router")();
const verify = require("../middleware/verify");

const Services = require("../services");
const CommentModel = require("../model/comment.model");

const { Comment } = Services;

router.get("/api/comment", async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { goodsId, pageSize = 999, pageNum = 1 } = request.query;
  const condition = goodsId ? { goods: goodsId } : { user: _id };

  const comments = await Comment.findComment(condition, {
    pageSize: +pageSize,
    pageNum: +pageNum
  });
  const count = await Comment.findCommentCount(condition);

  ctx.body = {
    code: 1,
    data: comments,
    pageSize,
    pageNum,
    count,
    message: "success"
  };
});

router.put("/api/comment/:id", async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;

  const update = request.body;
  const resp = await Comment.findAndUpdate({ _id: id }, update);

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

router.delete("/api/comment/:id", async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;
  const resp = await Comment.deleteComment({ _id: id });

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

router.post("/api/comment", verify(["admin", "user"]), async (ctx, next) => {
  const { request, response } = ctx;
  const {
    user: { _id }
  } = request;
  const { goodsId, content, reply } = request.body;

  const newComment = new CommentModel({
    _id: mongoose.Types.ObjectId(),
    content,
    reply,
    user: _id, // link user
    goods: goodsId
  });

  const resp = await newComment.save();

  if (resp) {
    ctx.body = {
      code: 1,
      data: newComment,
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
