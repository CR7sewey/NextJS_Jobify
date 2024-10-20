import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import prisma from "./db";
import { Prisma } from "@prisma/client";

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
    console.error(e);

    return null;
  }
};

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const user = await authenticateAndRedirect();
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: user.id,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        AND: [
          {
            status: jobStatus,
          },
        ],
      };
    }

    const job: JobType[] = await prisma.job.findMany({
      where: {
        ...whereClause,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return { jobs: job, count: 0, page: 1, totalPages: 0 };
  } catch (e) {
    console.log(e);
    return { jobs: [], count: 0, page: 0, totalPages: 0 };
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const user = await authenticateAndRedirect();
  try {
    const job = await prisma.job.findFirst({
      where: {
        clerkId: user.id,
        id,
      },
    });
    if (!job) {
      throw new Error("No job found!");
    }
    await prisma.job.delete({
      where: {
        clerkId: user.id,
        id,
      },
    });
    return job;
  } catch (e) {
    console.log(e);
    return null;
  }
}

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
