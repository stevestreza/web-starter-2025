import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    createdAt: String!
    updatedAt: String!
    sessions: [Session!]
  }

  type Session {
    id: ID!
    userId: String!
    token: String!
    createdAt: String!
    expiresAt: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Session!
    logout: Boolean!
  }
`; 