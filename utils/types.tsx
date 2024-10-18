import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Pending = "pending",
  Interview = "interview",
  Declined = "declined",
}

export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must be at max 50 characters.",
    }),
  company: z
    .string()
    .min(2, {
      message: "Company must be at least 2 characters.",
    })
    .max(50, {
      message: "Company must be at max 50 characters.",
    }),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .max(25, {
      message: "Location must be at max 25 characters.",
    }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;
