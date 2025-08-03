import request from "supertest";
import express from "express";
import articleRoutes from "../../src/routes/articleRoutes";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => {
  const mPrisma = {
    article: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("Article API (REST)", () => {
  let app: express.Express;
  let prismaMock: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/articles", articleRoutes);

    const { PrismaClient } = jest.requireMock("@prisma/client");
    prismaMock = new PrismaClient();
  });

  it("GET /articles debe devolver lista de artículos", async () => {
    const mockArticles = [
      {
        id: 1,
        title: "Hola",
        author: "Fulano",
        body: "texto",
        imageUrl: "url",
        date: new Date(),
      },
    ];
    prismaMock.article.findMany.mockResolvedValue(mockArticles);

    const response = await request(app).get("/articles");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      {
        id: 1,
        title: "Hola",
        body: "texto",
        imageUrl: "url",
        author: "Fulano",
        date: expect.any(String),
      },
    ]);

    expect(prismaMock.article.findMany).toHaveBeenCalled();
  });

  it("POST /articles debe crear un artículo", async () => {
    const newArticle = {
      title: "Nuevo",
      body: "Contenido",
      imageUrl: "https://img.jpg",
      author: "Leito",
    };

    const created = { ...newArticle, id: 1, date: new Date() };
    prismaMock.article.create.mockResolvedValue(created);

    const response = await request(app).post("/articles").send(newArticle);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      {
        id: 1,
        title: "Nuevo",
        body: "Contenido",
        imageUrl: "https://img.jpg",
        author: "Leito",
        date: expect.any(String),
      },
    );
    expect(prismaMock.article.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: newArticle })
    );
  });
});
