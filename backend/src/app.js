import cors from "cors";
import express from "express";
import facturiRouter from "./routes/facturi.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/facturi", facturiRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta nu există" });
});

app.use((err, _req, res, next) => {
  if (res.headersSent) return next(err);

  const status = err.status >= 400 && err.status < 500 ? err.status : 500;
  if (status === 500) console.error(err);

  const message = status === 500 ? "Eroare internă" : err.message;
  res.status(status).json({
    error: err.type === "entity.parse.failed" ? "Corpul JSON este invalid" : message,
  });
});

export default app;
