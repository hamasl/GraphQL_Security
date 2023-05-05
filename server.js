"use strict";

import { buildSchema } from "graphql";
import express from "express";
import { graphqlHTTP } from "express-graphql"

const PORT = 8080;

const app = express();

const schema = buildSchema(`
    type Query {
        hello: string
    }
`)

const root = {
    hello: () => "Hello World!"
}

app.use((req, _res, next) => {
    console.log(`Request: ${req.url}`);
    next();
})
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen({ port: PORT });
console.log(`Listening on port: ${PORT}`);