import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { typeDefs } from "./schema/typeDef";
import { PrismaClient } from "@prisma/client";
import { getResolvers } from "./resolvers/newsResolver";

dotenv.config();

async function startServer() {
  const prisma = new PrismaClient();
  const resolvers = getResolvers(prisma);
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Servidor corriendo en http://localhost:4000${server.graphqlPath}`
    )
  );
}

startServer();
