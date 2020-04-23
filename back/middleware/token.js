const TokenUtils = require("../utils/token");

module.exports = () => {
  return async (ctx, next) => {
    const { request: req, response: res } = ctx;
    const uid = ctx.cookies.get("uid");
    if (uid) {
      try {
        const payload = await TokenUtils.verifyToken(uid);
        req.user = {
          _id: payload._id,
          role: payload.role
        };
      } catch (err) {
        ctx.body = {
          code: 0,
          data: {},
          message: "unauthorized"
        };
      }
    } else {
      req.user = {};
    }
    await next();
  };
};
