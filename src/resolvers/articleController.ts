import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllArticles = async (_req: Request, res: Response) => {
  const articles = await prisma.article.findMany();
  res.json(articles);
};

export const getArticleById = async (req: Request, res: Response) => {
  console.log("id", req)
  const id = parseInt(req.params.id);
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return res.status(404).json({ error: "Artículo no encontrado" });
  res.json(article);
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, body, imageUrl, author } = req.body;
  const newArticle = await prisma.article.create({
    data: { title, body, imageUrl, author },
  });
  res.status(201).json(newArticle);
};

export const updateArticle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, body, imageUrl, author } = req.body;
  try {
    const updated = await prisma.article.update({
      where: { id },
      data: { title, body, imageUrl, author },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Artículo no encontrado" });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.article.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Artículo no encontrado" });
  }
};

export const searchArticles = async (req: Request, res: Response) => {
  const keyword = req.params.keyword;
  const results = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { author: { contains: keyword, mode: "insensitive" } },
      ],
    },
  });
  res.json(results);
};
