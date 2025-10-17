import express from "express";
import { requestPasswordReset,resetPassword ,loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/forgot-password", requestPasswordReset);  // envia email
router.post("/reset-password", resetPassword);         // altera senha

router.post("/login", loginUser);
router.post("/register", registerUser); // opcional, só a diretora deve criar outros usuários

export default router;
