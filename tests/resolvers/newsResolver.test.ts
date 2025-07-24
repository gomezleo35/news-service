import { PrismaClient } from "@prisma/client";
import { CreateArticleArgs } from "../../src/interfaces/interfaces";
import { getResolvers } from "./../../src/resolvers/newsResolver";

const mockPrisma = {
  article: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("Resolvers", () => {
  const prismaMock: any = mockPrisma;
  const resolvers = getResolvers(prismaMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allArticle debe devolver lista de artículos", async () => {
    const mockArticles = [
      { id: 1, title: "Hola", author: "Fulano", date: new Date() },
    ];
    mockPrisma.article.findMany.mockResolvedValue(mockArticles);

    const result = await resolvers.Query.allArticles();
    expect(result).toEqual(mockArticles);
    expect(mockPrisma.article.findMany).toHaveBeenCalled();
  });

  it("createArticle debe crear y devolver el artículo", async () => {
    const args: CreateArticleArgs = {
      title: "some title",
      body: "some Text",
      imageUrl: "someURL.com",
      author: "Mengano",
    };

    const createdArticle = { ...args, id: 123, date: new Date() };

    mockPrisma.article.create.mockResolvedValue(createdArticle);

    const result = await resolvers.Mutation.createArticle({}, args);
    expect(result).toEqual(createdArticle);
    expect(mockPrisma.article.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining(args),
      })
    );
  });
});
