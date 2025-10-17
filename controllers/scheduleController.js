// src/controllers/scheduleController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Listar todos os horários
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await prisma.classSchedule.findMany({
      include: {
        teacher: true, // inclui informações do professor
      },
    });
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar horários" });
  }
};

// Criar um novo horário
export const createSchedule = async (req, res) => {
  try {
    const { teacherId, weekday, startTime, endTime, subject, room } = req.body;

    if (!teacherId || !weekday || !startTime || !endTime || !subject || !room) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const newSchedule = await prisma.classSchedule.create({
      data: {
        teacherId,
        weekday,
        startTime,
        endTime,
        subject,
        room,
      },
    });

    res.status(201).json(newSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar horário" });
  }
};
