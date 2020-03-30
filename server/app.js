require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

//connect to mlab database

const uri =
  "mongodb+srv://tester:test123@cluster0-yumtw.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the MongoDB Atlas"))
  .catch(err => console.log(err.message));

mongoose.connection.once("open", () => {
  console.log("Connect to Database");
});

app.use(
  "/graphql",
  graphqlHTTP(
    //must pass in a graphql schema
    { schema: schema, graphiql: true }
  )
);

app.listen(4000, () => {
  console.log("now listening to server on port 4000");
});
