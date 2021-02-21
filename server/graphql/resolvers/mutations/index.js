const User = require("./user.mutation");
const Snap = require("./snap.mutation");

const Mutation = {
  ...User,
  ...Snap,
};

module.exports = Mutation;
