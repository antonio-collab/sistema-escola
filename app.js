import express from "express";
import cors from "cors";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/schedules", scheduleRoutes);

app.use("/api/auth", authRoutes);
app.use("/api", studentRoutes);

app.get("/routes", (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // middleware.route é uma rota
      const methods = Object.keys(middleware.route.methods)
        .map((m) => m.toUpperCase())
        .join(", ");
      routes.push(`${methods} ${middleware.route.path}`);
    } else if (middleware.name === "router") {
      // middleware é um router montado
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const methods = Object.keys(handler.route.methods)
            .map((m) => m.toUpperCase())
            .join(", ");
          routes.push(`${methods} ${handler.route.path}`);
        }
      });
    }
  });
  res.json(routes);
});
export default app;
