"use strict";

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/schema.js";
import { root } from "./src/root.js";

const PORT = 8080;

const app = express();

app.use((req, _res, next) => {
  console.log(`Request: ${req.url}`);
  next();
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen({ port: PORT });
console.log(`Listening on port: ${PORT}`);
