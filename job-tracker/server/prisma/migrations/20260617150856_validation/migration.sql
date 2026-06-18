-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Internship', 'Full_time', 'Part_time');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Pending', 'Viewed', 'Shortlisted', 'Offered', 'Hired', 'Rejected', 'Withdrawn');

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "job_type" "JobType" NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'Pending',
    "applied_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
