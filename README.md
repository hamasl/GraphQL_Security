# GraphQL_Security

A project for the course TDA 602 Language based security at Chalmers. Projects looks at vulnerabilities in GraphQL, and also how to exploit and patch them.

Project base inspired by: https://graphql.org/graphql-js/running-an-express-graphql-server/ (05.05.23).

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

To kille the container simply do:

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
