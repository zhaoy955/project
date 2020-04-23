const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profile: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  username: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "user" // admin user
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
  }
});

const UserModel = mongoose.model("User", UserSchema);

/**
 *
 * register
 *
 */
UserModel.register = newUser => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(6, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) reject(err);
        newUser.password = hash;
        newUser.save(resolve);
      });
    });
  });
};
/**
 *
 * authenticate
 *
 */
UserModel.authenticate = (password, user) => {
  return new Promise((resovle, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) reject(err);
      isMatch ? resovle() : reject("invalid password");
    });
  });
};

module.exports = UserModel;
