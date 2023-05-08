"use strict";

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/schema.js";
import { root } from "./src/root.js";
import { ENV, printENV } from "./src/envVars.js";
import VALIDATION_RULES from "./src/validation.js";

const PORT = 8080;

const app = express();

app.use((req, _res, next) => {
  console.log(`Request: ${req.url}${JSON.stringify(req.params)}`);
  next();
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: ENV.ALLOW_GRAPHIQL,
    validationRules: VALIDATION_RULES,
  })
);

app.listen({ port: PORT }, () => {
  console.log(`Listening on port: ${PORT}\n`);
  printENV();
  //Just to get a line break
  console.log();
});
