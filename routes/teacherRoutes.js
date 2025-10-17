import express from "express";
import { getAllTeachers, createTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", getAllTeachers);
router.post("/", createTeacher);

export default router;
