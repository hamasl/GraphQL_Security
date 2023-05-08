# GraphQL_Security

A project for the course TDA 602 Language based security at Chalmers. Projects looks at vulnerabilities in GraphQL, and also how to exploit and patch them.

Project base inspired by: https://graphql.org/graphql-js/running-an-express-graphql-server/ (05.05.23).

## .env

The server security in terms of GraphQL related issues, e.g., batched queries, can be configured via the .env file. Other issues such as proper authentication and authorization is outside the scope of this task as that applies to all web servers with user systems. A safe configuration can be: 
```
# Security parameters
ALLOW_INTROSPECTION="false"
ALLOW_GRAPHIQL="false"
DEPTH_LIMIT="5"
USERS_LIMIT="1000"
BATCH_LIMIT="5"
LOGIN_LIMIT="1"
CHNGPSWD_LIMIT="1"

# Generated mock users parameters
NUM_OF_FRIENDS="1"
NUM_OF_USERS="100"
GENERATED_PASSWORD_LENGTH="4"
```
Meanwhile, an insecure configuration usable for testing can be this:
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
GENERATED_PASSWORD_LENGTH="4"
```
## Package express-graphql deprecated

NEVER EVER USE THIS package for actual development as it is deprecated. Unfortunately, very little documentation was available online for the alternative graphql-http, making it hard to use. Along, with the main gist of this task being to look at exploitations, it was decided that the deprecated express-graphql would be kept.
