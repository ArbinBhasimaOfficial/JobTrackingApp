import { type Request, type Response } from "express";
import { type ApplicationStatus, type JobType } from "@prisma/client";
export declare const getAllApplications: (req: Request<{}, {}, {}, {
    status?: ApplicationStatus;
    search?: string;
}>, res: Response) => Promise<void>;
export declare const getApplicationById: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createApplication: (req: Request<{}, {}, {
    companyName: string;
    jobTitle: string;
    jobType: JobType;
    status: ApplicationStatus;
    appliedDate: string;
    notes?: string;
}>, res: Response) => Promise<void>;
export declare const updateApplication: (req: Request<{
    id: string;
}, {}, {
    companyName?: string;
    jobTitle?: string;
    jobType?: JobType;
    status?: ApplicationStatus;
    appliedDate?: string;
    notes?: string;
}>, res: Response) => Promise<void>;
export declare const deleteApplication: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=applicationsController.d.ts.map