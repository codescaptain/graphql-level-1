const bcrypt = require("bcrypt");
const Token = require("../../../helpers/Token");
module.exports = {
  createUser: async (
    parent,
    { data: { username, password } },
    { User, pubsub }
  ) => {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error("User already exits");
    }

    const newUser = await new User({
      username,
      password,
    }).save();
    pubsub.publish("user createad", {
      user: newUser,
    });

    return { token: Token.generate(newUser, "1h") };
  },
  signIn: async (parent, { data: { username, password } }, { User }) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User Not exits");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Wrong pass");
    }

    return { token: Token.generate(user, "1h") };
  },
};
