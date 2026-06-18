import { type Request, type Response } from "express";
import prisma from "../config/db.js";
import {
  type ApplicationStatus,
  type JobType,
  type Prisma,
} from "../generated/client.js";

export const getAllApplications = async (
  req: Request<{}, {}, {}, { status?: ApplicationStatus; search?: string }>,
  res: Response,
) => {
  try {
    const { status, search } = req.query;
    const applications = await prisma.application.findMany({
      where: {
        AND: [
          status ? { status } : {},
          search
            ? {
                OR: [
                  { companyName: { contains: search, mode: "insensitive" } },
                  { jobTitle: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(applications);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

export const getApplicationById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const app = await prisma.application.findUnique({
      where: { id: req.params.id },
    });
    if (!app) return res.status(404).json({ error: "Application not found" });
    res.json(app);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};

export const createApplication = async (
  req: Request<
    {},
    {},
    {
      companyName: string;
      jobTitle: string;
      jobType: JobType;
      status: ApplicationStatus;
      appliedDate: string;
      notes?: string;
    }
  >,
  res: Response,
) => {
  try {
    const { appliedDate, notes, ...rest } = req.body;

    const data: Prisma.ApplicationCreateInput = {
      ...rest,
      appliedDate: new Date(appliedDate),
      notes: notes && notes.trim() !== "" ? notes : null,
    };

    const newApp = await prisma.application.create({ data });
    res.status(201).json(newApp);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

export const updateApplication = async (
  req: Request<
    { id: string },
    {},
    {
      companyName?: string;
      jobTitle?: string;
      jobType?: JobType;
      status?: ApplicationStatus;
      appliedDate?: string;
      notes?: string;
    }
  >,
  res: Response,
) => {
  try {
    const { appliedDate, notes, ...rest } = req.body;

    // FIX: Reconstruct data object to cleanly parse incoming values
    const data: Prisma.ApplicationUpdateInput = {
      ...rest,
      ...(appliedDate ? { appliedDate: new Date(appliedDate) } : {}),
      ...(notes !== undefined ? { notes: notes && notes.trim() !== "" ? notes : null } : {}),
    };

    const updatedApp = await prisma.application.update({
      where: { id: req.params.id },
      data,
    });
    res.json(updatedApp);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

export const deleteApplication = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    await prisma.application.delete({ where: { id: req.params.id } });
    res.json({ message: "Application deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
};
