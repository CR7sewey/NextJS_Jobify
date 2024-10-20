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

export async function getSingleJobAction(id: string) {
  const user = await authenticateAndRedirect();
  let job: JobType | null = null;
  try {
    job = await prisma.job.findFirst({
      where: {
        clerkId: user.id,
        id,
      },
    });
    if (!job) {
      throw new Error("No job found!");
    }
  } catch (e) {
    console.log(e);
    redirect("/jobs");
  }
  return job;
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const user = await authenticateAndRedirect();
  let job: JobType | null = null;
  try {
    job = await prisma.job.findFirst({
      where: {
        clerkId: user.id,
        id,
      },
    });
    if (!job) {
      throw new Error("No job found!");
    }
    await prisma.job.update({
      where: {
        id,
        clerkId: user.id,
      },
      data: {
        ...values,
      },
    });
  } catch (e) {
    console.log(e);
    redirect("/jobs");
  }
  return job;
}

export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  const user = await authenticateAndRedirect();
  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        clerkId: user.id,
      },
    });
    const statsObject = stats.reduce((acc, values) => {
      acc[values.status] = values._count.status;
      return acc;
    }, {} as Record<string, number>);
    let defaultStats = { pending: 0, declined: 0, interview: 0 };
    defaultStats = { ...defaultStats, ...statsObject };
    return defaultStats;
  } catch (e) {
    redirect("/jobs");
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
