"use client";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";
import { getJobs } from "@/utils/queryActions";
import data1 from "../../prisma/data.json";
import ButtonContainer from "./ButtonContainer";

function JobsDisplay() {
  console.log(data1);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  /*const { data, isPending, isError } = getJobs({
    search,
    jobStatus,
    pageNumber,
  });*/
  const { data, isPending, isError } = {
    data: { jobs: data1.data },
    isPending: false,
    isError: false,
  };

  /*useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });*/
  const jobs = data?.jobs || [];
  if (isError) {
    return redirect("/");
  }
  const count = data?.count || 2000; // || 0
  const page = data?.page || 1; // || 0
  const totalPages = data?.totalPages || 200; // || 0;

  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

  return (
    <>
      {/*button container  */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold capitalize ">
          {count} jobs found
        </h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className="grid md:grid-cols-2  gap-8">
        {jobs.map((job) => {
          return <JobCard key={job.id} job={job} />;
        })}
      </div>
    </>
  );
}

export default JobsDisplay;

const mockData = [
  {
    id: "1",
    updatedAt: new Date("2023-10-02T09:17:18Z"),
    clerkId: process.env.ADMIN_USER_ID,
    position: "Project Manager",
    company: "Viva",
    location: "Nanam",
    status: "declined",
    mode: "part-time",
    createdAt: new Date("2023-10-02T09:17:18Z"),
  },
  {
    id: "2",
    updatedAt: new Date("2023-10-02T09:17:18Z"),
    clerkId: process.env.ADMIN_USER_ID,
    position: "Payment Adjustment Coordinator",
    company: "Tagtune",
    location: "Murygino",
    status: "interview",
    mode: "internship",
    createdAt: new Date("2023-09-30T20:58:48Z"),
  },
  {
    id: "3",
    updatedAt: new Date("2023-10-02T09:17:18Z"),
    clerkId: process.env.ADMIN_USER_ID,
    position: "Nurse Practicioner",
    company: "Wordware",
    location: "Odivelas",
    status: "interview",
    mode: "full-time",
    createdAt: new Date("2023-06-04T14:12:12Z"),
  },
  {
    id: "4",
    updatedAt: new Date("2023-10-02T09:17:18Z"),
    clerkId: process.env.ADMIN_USER_ID,
    position: "GIS Technical Architect",
    company: "Twiyo",
    location: "Dejen",
    status: "declined",
    mode: "internship",
    createdAt: new Date("2023-10-06T08:35:06Z"),
  },
];
