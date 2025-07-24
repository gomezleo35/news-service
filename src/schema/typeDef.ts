import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Article {
    id: Int!
    title: String!
    body: String!
    imageUrl: String!
    author: String!
    date: String!
  }

  type Query {
    allArticles: [Article!]!
    article(id: Int!): Article
    searchArticles(keyword: String!): [Article!]!
  }

  type Mutation {
    createArticle(title: String!, body: String!, imageUrl: String!, author: String!): Article!
    updateArticle(id: Int!, title: String, body: String, imageUrl: String, author: String): Article!
    deleteArticle(id: Int!): Article!
  }
`;
