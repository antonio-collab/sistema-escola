import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, subject } = req.body;
    const newTeacher = await prisma.teacher.create({
      data: { name, email, phone, subject },
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
