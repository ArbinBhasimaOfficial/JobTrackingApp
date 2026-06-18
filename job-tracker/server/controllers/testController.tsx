import { type Request, type Response } from "express";
import prisma from "../config/db.js";
import {
  type Prisma,
  type JobType,
  type ApplicationStatus,
} from "@prisma/client";

export const createApplication = async (
  req: Request<
    {},
    {},
    {
      companyName: string;
      jobTitle: string;
      jobType: string;
      status: string;
      appliedDate: string;
      notes?: string;
    }
  >,
  res: Response,
) => {
  try {
    const { companyName, jobTitle, jobType, status, appliedDate, notes } =
      req.body;

    // Construct the data object exactly as Prisma expects
    const applicationData: Prisma.ApplicationCreateInput = {
      companyName,
      jobTitle,
      jobType: jobType as JobType,
      status: status as ApplicationStatus,
      appliedDate: new Date(appliedDate), // Ensure this matches your schema's DateTime type
      notes: notes ?? null, // Prisma often requires explicit null for optional string fields
    };

    const newApplication = await prisma.application.create({
      data: applicationData,
    });

    res.status(201).json({
      message: "Application created successfully!",
      data: newApplication,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Error", error: errorMessage });
  }
};
