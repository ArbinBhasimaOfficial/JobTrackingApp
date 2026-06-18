import {
  body,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { type Request, type Response, type NextFunction } from "express";

const rules: ValidationChain[] = [
  body("companyName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Company name must be at least 2 characters."),
  body("jobTitle").trim().notEmpty().withMessage("Job title is required."),
  body("jobType")
    .isIn(["Internship", "Full_time", "Part_time"])
    .withMessage("Invalid job type."),
  body("status")
    .isIn([
      "Pending",
      "Viewed",
      "Shortlisted",
      "Offered",
      "Hired",
      "Rejected",
      "Withdrawn",
    ])
    .withMessage("Invalid status."),
  body("appliedDate").isISO8601().withMessage("Invalid date format."),
  body("notes")
    .optional({ values: "falsy" }) // Allows empty or missing notes
    .trim(),
];

export const validateApplication = [
  ...rules,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
