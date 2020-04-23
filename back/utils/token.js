const jwt = require("jsonwebtoken"),
  config = require("../config");

module.exports = {
  signToken(
    payload,
    options = {
      expiresIn: 604800
    }
  ) {
    if (!payload) throw new Error("payload is not exist");
    return jwt.sign(payload, config.jwtSecret, options);
  },
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      try {
        let payload = jwt.verify(token, config.jwtSecret);
        resolve(payload);
      } catch (err) {
        reject(err);
      }
    });
  }
};
