import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, searchArticles, updateArticle } from "../resolvers/articleController";

const router = Router();

router.get("/", getAllArticles);
router.get("/search/:keyword", searchArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
