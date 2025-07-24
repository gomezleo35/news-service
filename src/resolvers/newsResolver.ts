import { Article, PrismaClient } from "@prisma/client";
import { CreateArticleArgs, DeleteArticleArgs, ArticleArgs, SearchArgs, UpdateArticleArgs } from "../interfaces/interfaces";

export const getResolvers =  (prisma: PrismaClient) => ({
  Query: {
    allArticles: async (): Promise<Article[]> => {
      return prisma.article.findMany();
    },

    article: async (_: unknown, args: ArticleArgs): Promise<Article | null> => {
      return prisma.article.findUnique({ where: { id: args.id } });
    },

    searchArticles: async (_: unknown, args: SearchArgs): Promise<Article[]> => {
      return prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: args.keyword, mode: 'insensitive' } },
            { author: { contains: args.keyword, mode: 'insensitive' } },
          ],
        },
      });
    },
  },

  Mutation: {
    createArticle: async (_: unknown, args: CreateArticleArgs): Promise<Article> => {
      return prisma.article.create({
        data: {
          ...args,
          date: new Date(),
        },
      });
    },

    updateArticle: async (_: unknown, args: UpdateArticleArgs): Promise<Article> => {
      const { id, ...data } = args;
      return prisma.article.update({
        where: { id },
        data,
      });
    },

    deleteArticle: async (_: unknown, args: DeleteArticleArgs): Promise<Article> => {
      return prisma.article.delete({
        where: { id: args.id },
      });
    },
  },
});
