import {} from "express";
import prisma from "../config/db.js";
import {} from "@prisma/client";
export const getAllApplications = async (req, res) => {
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
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message });
    }
};
export const getApplicationById = async (req, res) => {
    try {
        const app = await prisma.application.findUnique({
            where: { id: req.params.id },
        });
        if (!app)
            return res.status(404).json({ error: "Application not found" });
        res.json(app);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message });
    }
};
export const createApplication = async (req, res) => {
    try {
        const { appliedDate, notes, ...rest } = req.body;
        const data = {
            ...rest,
            appliedDate: new Date(appliedDate),
            notes: notes && notes.trim() !== "" ? notes : null,
        };
        const newApp = await prisma.application.create({ data });
        res.status(201).json(newApp);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ error: message });
    }
};
export const updateApplication = async (req, res) => {
    try {
        const { appliedDate, notes, ...rest } = req.body;
        // FIX: Reconstruct data object to cleanly parse incoming values
        const data = {
            ...rest,
            ...(appliedDate ? { appliedDate: new Date(appliedDate) } : {}),
            ...(notes !== undefined ? { notes: notes && notes.trim() !== "" ? notes : null } : {}),
        };
        const updatedApp = await prisma.application.update({
            where: { id: req.params.id },
            data,
        });
        res.json(updatedApp);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({ error: message });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        await prisma.application.delete({ where: { id: req.params.id } });
        res.json({ message: "Application deleted successfully" });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message });
    }
};
//# sourceMappingURL=applicationsController.js.map