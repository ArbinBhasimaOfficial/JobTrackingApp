import { type Request, type Response } from "express";
export declare const createApplication: (req: Request<{}, {}, {
    companyName: string;
    jobTitle: string;
    jobType: string;
    status: string;
    appliedDate: string;
    notes?: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=testController.d.ts.map