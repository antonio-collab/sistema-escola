// // src/routes/studentRoutes.js
// import express from "express";
// import {
//   getAllStudents,
//   getStudentById,
//   createStudent,
//   updateStudent,
//   deleteStudent,
// } from "../controllers/studentController.js";

// const router = express.Router();

// // Rotas de estudante
// router.get("/", getAllStudents);         // Listar todos os alunos
// router.get("/:id", getStudentById);     // Buscar aluno por ID
// router.post("/", createStudent);        // Criar novo aluno
// router.put("/:id", updateStudent);      // Atualizar aluno
// router.delete("/:id", deleteStudent);   // Deletar aluno

// export default router;
import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Rotas protegidas
router.get("/students/", authenticate, authorize(["DIRECTOR", "SECRETARY"]), getAllStudents);
router.get("/students/:id", authenticate, authorize(["DIRECTOR", "SECRETARY"]), getStudentById);
router.post("/students/", authenticate, authorize(["DIRECTOR", "SECRETARY"]), createStudent);
router.put("/students/:id", authenticate, authorize(["DIRECTOR", "SECRETARY"]), updateStudent);
router.delete("/students/:id", authenticate, authorize(["DIRECTOR"]), deleteStudent);

export default router;

