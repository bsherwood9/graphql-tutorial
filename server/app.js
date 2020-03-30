const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

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
