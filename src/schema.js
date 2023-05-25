import { buildSchema } from "graphql";

// Defining the schema for GraphQL in order to set restrictions
// on what action can be done by a client
const schema = buildSchema(`
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
`);

export { schema };
