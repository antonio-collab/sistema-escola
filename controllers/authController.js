import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// Registrar usuário
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(400).json({ message: "Erro ao criar usuário", error: err.message });
  }
};

// Login de usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Senha inválida" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro ao fazer login", error: err.message });
  }
};

// Solicitar recuperação de senha
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hora

    await prisma.passwordReset.create({
      data: { userId: user.id, token, expiresAt },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"ONG" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Recuperação de senha",
      text: `Clique aqui para resetar sua senha: ${resetLink}`,
    });

    res.json({ message: "Email de recuperação enviado" });
  } catch (err) {
    console.error("Erro ao solicitar recuperação de senha:", err);
    res.status(500).json({ message: "Não foi possível enviar email de recuperação", error: err.message });
  }
};

// Resetar senha
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const reset = await prisma.passwordReset.findUnique({ where: { token } });
    if (!reset || reset.used || reset.expiresAt < new Date()) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: reset.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { used: true },
    });

    res.json({ message: "Senha alterada com sucesso" });
  } catch (err) {
    console.error("Erro ao resetar senha:", err);
    res.status(500).json({ message: "Não foi possível resetar a senha", error: err.message });
  }
};
