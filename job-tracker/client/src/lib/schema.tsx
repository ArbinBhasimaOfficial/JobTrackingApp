import { z } from 'zod';

export const APPLICATION_STATUSES = [
  'Pending',
  'Viewed',
  'Shortlisted',
  'Offered',
  'Hired',
  'Rejected',
  'Withdrawn'
] as const;

export const ApplicationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobType: z.enum(["Full_time", "Internship", "Part_time"]),
  status: z.enum(APPLICATION_STATUSES),
  appliedDate: z.string().min(1, "Applied date is required"),
  notes: z.string().optional()
});

export type ApplicationFormData = z.infer<typeof ApplicationSchema>;

export interface JobApplication extends ApplicationFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}
