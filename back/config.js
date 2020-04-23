module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: "0327",
  database: {
    local: "mongodb://localhost:27017/mydatabase"
  }
};
