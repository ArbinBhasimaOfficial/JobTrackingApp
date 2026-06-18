import {} from "express";
import prisma from "../config/db.js";
import {} from "@prisma/client";
export const createApplication = async (req, res) => {
    try {
        const { companyName, jobTitle, jobType, status, appliedDate, notes } = req.body;
        // Construct the data object exactly as Prisma expects
        const applicationData = {
            companyName,
            jobTitle,
            jobType: jobType,
            status: status,
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
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "Error", error: errorMessage });
    }
};
//# sourceMappingURL=testController.js.map