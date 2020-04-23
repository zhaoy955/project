const mongoose = require("mongoose");
const router = require("koa-router")();
const Services = require("../services");
const UserModel = require("../model/user.model");
const TokenUtil = require("../utils/token");
const verify = require("../middleware/verify");

const { User } = Services;

router.get("/api/users", verify(["admin"]), async (ctx, next) => {
  const { request, response } = ctx;
  const { pageSize = 10, pageNum = 1, phone, username } = request.query;
  const condition = {};
  if (phone) {
    condition.phone = phone;
  }
  if (username) {
    condition.username = username;
  }

  const users = await User.findUser(condition, {
    pageSize: +pageSize,
    pageNum: +pageNum
  });
  const count = await User.findUserCount(condition);

  ctx.body = {
    code: 1,
    data: users,
    pageSize,
    pageNum,
    count,
    message: "success"
  };
});

router.get("/api/user/login", async (ctx, next) => {
  const { request, response } = ctx;
  const { _id } = request.user;

  const hasUser = await User.findOne({ _id });
  if (!hasUser) {
    ctx.body = {
      code: 0,
      data: {},
      message: "The username could not be found"
    };
    return;
  } else {
    ctx.cookies.set(
      "uid",
      TokenUtil.signToken({
        _id: hasUser._id,
        role: hasUser.role
      }),
      {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        overwrite: false
      }
    );
    ctx.body = {
      code: 1,
      data: hasUser,
      message: "success"
    };
  }
});

router.post("/api/user/login", async (ctx, next) => {
  const { request, response } = ctx;
  const { username, password } = request.body;

  const hasUser = await User.findOne({ username });

  if (!hasUser) {
    ctx.body = {
      code: 0,
      data: {},
      message: "The username could not be found"
    };
    return;
  }
  await UserModel.authenticate(password, hasUser).then(
    () => {
      ctx.cookies.set(
        "uid",
        TokenUtil.signToken({
          _id: hasUser._id,
          role: hasUser.role
        }),
        {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: false,
          overwrite: false
        }
      );
      ctx.body = {
        code: 1,
        data: hasUser,
        message: "success"
      };
    },
    err => {
      ctx.body = {
        code: 0,
        data: {},
        message: err
      };
    }
  );
});

router.delete("/api/users/:id", verify(["admin"]), async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;
  const resp = await User.deleteUser({ _id: id });

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

router.put("/api/users/:id", async (ctx, next) => {
  const { request, response, params } = ctx;
  const { id } = params;

  const update = request.body;
  const resp = await Users.findAndUpdate({ _id: id }, update);

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

router.post("/api/user/register", async (ctx, next) => {
  const { request, response } = ctx;
  const { username, password, role, address, phone, profile } = request.body;

  const hasUser = await User.findOne({ username });

  if (hasUser) {
    ctx.body = {
      code: 0,
      data: {},
      message: "The username is already registered"
    };
    return;
  }

  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    username,
    password,
    role,
    address,
    phone,
    profile
  });

  const resp = await UserModel.register(user);
  if (!resp) {
    const { _id, role } = user;
    ctx.cookies.set(
      "uid",
      TokenUtil.signToken({
        _id: _id,
        role: role
      }),
      {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false,
        overwrite: false
      }
    );
    ctx.body = {
      code: 1,
      data: user,
      message: "success"
    };
  } else {
    ctx.body = {
      code: 0,
      data: user,
      message: "registered user failed"
    };
  }
});

module.exports = router;
