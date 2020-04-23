function role(roles = ["admin", "user"]) {
  return async (ctx, next) => {
    const { request: req } = ctx;
    const { user } = req;
    if (roles.includes(user.role)) {
      await next();
    } else {
      ctx.body = {
        code: 0,
        data: {},
        message: "unauthorized"
      };
    }
  };
}

module.exports = role;
