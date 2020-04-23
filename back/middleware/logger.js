module.exports = () => {
  return async (ctx, next) => {
    const { request: req } = ctx;
    console.log(
      `${new Date().toLocaleString()} [${req.method
        .toString()
        .toUpperCase()}] -- ${req.originalUrl} `
    );
    await next();
  };
};
