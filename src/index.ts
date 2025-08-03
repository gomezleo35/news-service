import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/articles", articleRoutes);

app.listen(PORT, () => {
  console.log(`🚀 API REST corriendo en http://localhost:${PORT}`);
});

export default app;