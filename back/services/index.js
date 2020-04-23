const glob = require("glob");
const path = require("path");

const reg = /(?!\/)([^\/]+)(?=\.js)/g;

let container = {};
let attribute = "";

glob.sync(path.resolve(__dirname, "./*.js")).map(url => {
  attribute = url.match(reg)[0];
  attribute = attribute.substring(0, 1).toUpperCase() + attribute.substring(1);
  if (attribute !== "INDEX") {
    container[attribute] = require(url);
  }
});

module.exports = container;
