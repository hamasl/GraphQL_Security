import { buildSchema } from "graphql";


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
`);

export { schema };