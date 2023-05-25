"use strict";

import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./src/schema.js";
import { root } from "./src/root.js";
import { ENV, printENV } from "./src/envVars.js";
import VALIDATION_RULES from "./src/validation.js";

// Hardcoded because school project and not production system
const PORT = 8080;

const app = express();

// Logging requests through middleware
app.use((req, _res, next) => {
  console.log(`Request: ${req.url}${JSON.stringify(req.params)}`);
  next();
});

// Defining the graphql server through middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    // Allow or disallow GraphiQL GUI via environment variable ALLOW_GRAPHIQL
    graphiql: ENV.ALLOW_GRAPHIQL,
    // The validation rules set in src/validation.js
    validationRules: VALIDATION_RULES,
  })
);

// Start server listenig on the hardcoded port,
// Additionally printing out all selected environment variables
app.listen({ port: PORT }, () => {
  console.log(`Listening on port: ${PORT}\n`);
  printENV();
  //Just to get a line break
  console.log();
});
