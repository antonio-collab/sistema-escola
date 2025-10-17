// src/controllers/studentController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todos os alunos
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        enrollments: true, // inclui matrículas do aluno
      },
    });
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
};

// Buscar aluno por ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
      include: { enrollments: true },
    });
    if (!student) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
};

// Criar novo aluno
export const createStudent = async (req, res) => {
  const { name, email, birthDate } = req.body;
  try {
    const newStudent = await prisma.student.create({
      data: {
        name,
        email,
        birthDate: new Date(birthDate),
      },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
};

// Atualizar aluno
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, birthDate } = req.body;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
};

// Deletar aluno
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
};
