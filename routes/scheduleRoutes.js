import express from "express";
import { getAllSchedules, createSchedule } from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/", getAllSchedules);
router.post("/", createSchedule);

export default router; // ✅ isso cria o "default export"
