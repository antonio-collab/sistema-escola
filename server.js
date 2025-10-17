import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Captura erros não tratados fora do Express
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection:", reason);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
