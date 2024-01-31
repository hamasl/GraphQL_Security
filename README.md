# GraphQL Security

**DISCLAIMER: IN NO WAY USE THIS PROJECT FOR INSPIRATION IN HOW TO WRITE SECURE GRAPHQL WEB SERVICES AS THIS IS A SCHOOL PROJECT WITH EXPERIMENTATION BEING THE MAIN PURPOSE. INSTEAD LOOK UP A RECENT GUIDE FROM TRUSTED SOURCES AND USE SECURE GRAPHQL FRAMEWORKS**

By: [EmilYun](https://github.com/EmilYun) and [hamasl](https://github.com/hamasl)

A project for the course TDA 602 Language based security at Chalmers. Projects looks at vulnerabilities in GraphQL, and also how to exploit and patch them.

Project code base inspired by: https://graphql.org/graphql-js/running-an-express-graphql-server/ (05.05.23).

## Description

Project is a simple GraphQL server running on express and uses the deprecated express-graphql library, which is ok in this case as the goal is to exploit the server. As said the purpose was to explore how GraphQL could be exploited with [Hacking GraphQL for Fun and Profit -- Part 1 -- Understanding GraphQL Basics](https://infosecwriteups.com/hacking-graphql-for-fun-and-profit-part-1-understanding-graphql-basics-72bb3dd22efa) and [Hacking GraphQL for Fun and Profit (2): Methodology & Examples](https://www.secjuice.com/hacking-graphql-for-fun-and-profit-part-2-methodology-and-examples/) as inspiration.

We managed to abbuse three different exploits. Firstly, introspection to dump the entire scheme to potentially find flaws in the API that can be further exploited. Secondly, brute-force password cracking via batching many login requests together in the same request, such that traditional network security tools like e.g., IDS where unlikely to see unusual network activity. Lastly, DoS attacks that again bypassed network layer security, as it was not the number of packets being sent that DoS-ed the server, but rather the complexity of the queries which the server could not handle. The high complexity queries were achieved through batching, requesting many of one object (e.g., users), and lastly deeply nested queries.

After the exploits, we showcased how they could be patched. In this step we got inspiration from the OWASP [GraphQL Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html). Introspection we fixed by configuring express-graphql such that graphiql and schema introspection became disabled, however, this does only obscure the problem as brute force guessing can still be applied. Also API flaws might still be present. Brute-force password cracking was mainly hindered by applying alias limiting via the library [graphql-no-alias](https://github.com/ivandotv/graphql-no-alias) by Ivan Vlatković, such that we could set the limit for login and change password requests to 1 per query, meaning brute forcing over the network would again become visible to IDSs and take a lot more time due too network latency. DoS was mitigated via a combination of many patches. Firstly, depth limiting via the library [graphql-depth-limit](https://www.npmjs.com/package/graphql-depth-limit) by acarl005 allowed us to limit the depth of nested queries, thereby greatly reducing the allowed complexity. Secondly, for queries that return collections of objects we capped the amount of objects that could be returned. Lastly, batch limiting via the library [graphql-no-batched-queries](https://github.com/ivandotv/graphql-no-batched-queries) by Ivan Vlatković, allowed us to limit the amount of queries + mutation batched in the same request.

## Schema

The schema mainly consist of a simple user with friends. This recursive relationship enbales recursive nesting of queries which was important when showcasing the DoS vulnerabilities:

```
type User {
    id: Int
    username: String
    friends: [User]
}

type Query {
    user(id: Int!): User
    users(first: Int): [User]
    login(username: String!, password: String!): Boolean
}

type Mutation {
    changePassword(username: String!, newPassword: String!): Boolean
}
```

## Requirements

- Docker
- make (recommended)
- npm version 9.6.6 (for development)
- node version 18.12.1 aka lts/hydrogen (for development)

## Development

**NO** development should be done on this server as it is no way secure. It simply exists to display some exploits, and mitigations. The server uses a deprecated library called **express-graphql**
In order to start developing one should download the used libraries specified in the **package.json** file:

```
npm install --legacy-peer-deps
```

## Before running: .env

The server security in terms of GraphQL related issues, e.g., batched queries, can be configured via the .env file. Other issues such as proper authentication and authorization is outside the scope of this task as that applies to all web servers with user systems.

### Secure configuration:

**NOTE:** This configuration was considered secure considering the discovered exploits and the infrastructure we run on, which was a resource limited Docker container. For a non restricted container the depth limits, users limit etc could be higher, but the login and change password limit should never be above 1 as to hinder brute force cracking. Additionally, a high number of clients could also mean that stricter limits for e.g., depth is needed are needed. Either way again please consult a recent guide from a trusted source on how to create secure GraphQL applications and use a secure GraphQL framework.

```
# Security parameters
ALLOW_INTROSPECTION="false"
ALLOW_GRAPHIQL="false"
DEPTH_LIMIT="4"
USERS_LIMIT="100"
BATCH_LIMIT="5"
LOGIN_LIMIT="1"
CHNGPSWD_LIMIT="1"

# Generated mock users parameters
NUM_OF_FRIENDS="1"
NUM_OF_USERS="1000"
GENERATED_PASSWORD_LENGTH="3"
```

### Insecure configuration for pentesting:

```
# Security parameters
ALLOW_INTROSPECTION="true"
ALLOW_GRAPHIQL="true"
DEPTH_LIMIT="-1"
USERS_LIMIT="-1"
BATCH_LIMIT="-1"
LOGIN_LIMIT="-1"
CHNGPSWD_LIMIT="-1"

# Generated mock users parameters
NUM_OF_FRIENDS="1"
NUM_OF_USERS="100"
GENERATED_PASSWORD_LENGTH="3"
```

## Running

Make sure Docker is installed and running. Additionally, add a **.env** file to the project root as described above. The commands:

```
make app
```

or more manually:

```
make build
make run
```

should work alternatively without make, these commands can be used:

```
docker build -t tda602_graphql .
docker run --cpus=1 -m 100m --memory-swap=100m --rm -p 8080:8080 --name tda602_graphql tda602_graphql
```

The GraphQL server should be accessible via the endpoint:

```
http://localhost:8080/graphql
```

which will provided the GraphiQL GUI if enabled in **.env**.
Otherwise, one can run a test query via the URL:

```
http://localhost:8080/graphql?query={user(id:1){id}}
```

To kill the container simply do:

```
make kill
```

or

```
docker kill tda602_graphql
```

If any more commands are needed, please consult the **Makefile** to either see their name and run them through make, or copy paste them to manually run them through Docker.

## Package express-graphql deprecated

NEVER EVER USE THIS package for actual development as it is deprecated. Unfortunately, very little documentation was available online for the alternative graphql-http, making it hard to use. Along, with the main gist of this task being to look at exploitations, it was decided that the deprecated express-graphql would be kept.
