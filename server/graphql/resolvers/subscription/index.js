const Snap = require("./snap.subscription");
const User = require("./user.subscription");

const Subscription = {
  ...Snap,
  ...User,
};

module.exports = Subscription;
