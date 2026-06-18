import {
  body,
  validationResult,
  type ValidationChain,
} from "express-validator";
import { type Request, type Response, type NextFunction } from "express";

const rules = (isPatch: boolean): ValidationChain[] => [
  body("companyName")
    .if(() => !isPatch || body("companyName").exists()).trim()
    .isLength({ min: 2 })
    .withMessage("Company name must be at least 2 characters."),

  body("jobTitle")
    .if(() => !isPatch || body("jobTitle").exists())
    .trim()
    .notEmpty()
    .withMessage("Job title is required."),

  body("jobType")
    .if(() => !isPatch || body("jobType").exists())
    .isIn(["Full_time", "Internship", "Part_time"])
    .withMessage("Invalid job type."),

  body("status")
    .if(() => !isPatch || body("status").exists())
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

  body("appliedDate")
    .if(() => !isPatch || body("appliedDate").exists())
    .isISO8601()
    .withMessage("Invalid date format."),

  body("notes")
    .optional({ values: "falsy" })
    .trim(),
];

export const validateApplication = (req: Request, res: Response, next: NextFunction) => {
  const isPatch = req.method === "PATCH";
  const activeRules = rules(isPatch);

  Promise.all(activeRules.map((rule) => rule.run(req))).then(() => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("VALIDATION FAILED FOR REGISTRATION:", errors.array());

      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
};
