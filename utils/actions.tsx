import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import prisma from "./db";

export const createJobAction = async (
  values: CreateAndEditJobType
): Promise<JobType | null> => {
  const user = await authenticateAndRedirect();
  try {
    console.log("oi");
    createAndEditJobSchema.parse(values);
    const job: JobType = await prisma.job.create({
      data: { ...values, clerkId: user.id },
    });
    return job;
  } catch (e) {
    console.log(e);

    return null;
  }
};

const renderError = (error: Error | string | unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error ocurred...",
  };
};

const authenticateAndRedirect = async () => {
  const user = await currentUser();
  if (!user) {
    //throw new Error("You must be logged in to access this route...!");
    redirect("/");
  }
  return user;
};
