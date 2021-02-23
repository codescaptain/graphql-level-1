const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { importSchema } = require("graphql-import");
const resolvers = require("./graphql/resolvers/index");
const jwt = require("jsonwebtoken");

dotenv.config();
const User = require("./models/User");
const Snap = require("./models/Snap");
const server = new ApolloServer({
  typeDefs: importSchema("./graphql/schema.graphql"),
  resolvers,
  context: ({ req }) => ({
    User,
    Snap,
    activeUser: req.activeUser,
  }),
});

mongoose
  .connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Db Çalıştı"))
  .catch((err) => console.log(err));
const app = express();
app.use(async (req, res, next) => {
  const token = req.headers["autorization"];
  if (token && token !== "null") {
    try {
      const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
      req.activeUser = activeUser;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () => {
  console.log(`🚀  Server ready at http://localhost4001${server.graphqlPath}`);
});
