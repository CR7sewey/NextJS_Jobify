"use client";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";
import JobCard from "./JobCard";
import { getJobs } from "@/utils/queryActions";

function JobsDisplay() {
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
    data: { jobs: mockData },
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
  if (isPending) return <h2 className="text-xl">Please Wait...</h2>;
  if (jobs.length < 1) return <h2 className="text-xl">No Jobs Found...</h2>;

  return (
    <>
      {/*button container  */}
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
    position: "Project Manager",
    company: "Viva",
    location: "Nanam",
    status: "declined",
    mode: "part-time",
    createdAt: "2023-10-02T09:17:18Z",
  },
  {
    position: "Payment Adjustment Coordinator",
    company: "Tagtune",
    location: "Murygino",
    status: "interview",
    mode: "internship",
    createdAt: "2023-09-30T20:58:48Z",
  },
  {
    position: "Nurse Practicioner",
    company: "Wordware",
    location: "Odivelas",
    status: "interview",
    mode: "full-time",
    createdAt: "2023-06-04T14:12:12Z",
  },
  {
    position: "GIS Technical Architect",
    company: "Twiyo",
    location: "Dejen",
    status: "declined",
    mode: "internship",
    createdAt: "2023-10-06T08:35:06Z",
  },
  {
    position: "Engineer IV",
    company: "Roomm",
    location: "Skinnskatteberg",
    status: "pending",
    mode: "full-time",
    createdAt: "2022-12-18T19:15:47Z",
  },
  {
    position: "VP Accounting",
    company: "Avamba",
    location: "Khuma",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-08-25T16:43:51Z",
  },
  {
    position: "Senior Quality Engineer",
    company: "Nlounge",
    location: "Darłowo",
    status: "declined",
    mode: "part-time",
    createdAt: "2023-07-26T00:10:31Z",
  },
  {
    position: "Geological Engineer",
    company: "Blogtags",
    location: "Sung Noen",
    status: "interview",
    mode: "internship",
    createdAt: "2023-08-03T16:10:13Z",
  },
  {
    position: "VP Product Management",
    company: "Youbridge",
    location: "Almeirim",
    status: "pending",
    mode: "part-time",
    createdAt: "2023-07-30T21:06:42Z",
  },
  {
    position: "VP Product Management",
    company: "Meejo",
    location: "Werota",
    status: "pending",
    mode: "part-time",
    createdAt: "2023-05-31T19:22:31Z",
  },
  {
    position: "Marketing Assistant",
    company: "Kayveo",
    location: "Torrevieja",
    status: "declined",
    mode: "internship",
    createdAt: "2023-04-27T08:58:03Z",
  },
  {
    position: "Software Consultant",
    company: "Yodoo",
    location: "Kieta",
    status: "declined",
    mode: "internship",
    createdAt: "2023-02-26T12:12:49Z",
  },
  {
    position: "Research Assistant II",
    company: "Oyope",
    location: "Monte Patria",
    status: "pending",
    mode: "part-time",
    createdAt: "2023-01-29T10:17:21Z",
  },
  {
    position: "Product Engineer",
    company: "Jetwire",
    location: "Taurage",
    status: "pending",
    mode: "full-time",
    createdAt: "2023-11-14T03:54:46Z",
  },
  {
    position: "Sales Representative",
    company: "Photobug",
    location: "Dawuhan",
    status: "declined",
    mode: "internship",
    createdAt: "2023-10-14T00:18:56Z",
  },
  {
    position: "Administrative Officer",
    company: "Skajo",
    location: "Pallasca",
    status: "declined",
    mode: "full-time",
    createdAt: "2023-07-30T22:07:46Z",
  },
  {
    position: "Actuary",
    company: "Brainverse",
    location: "Urbiztondo",
    status: "declined",
    mode: "full-time",
    createdAt: "2023-08-02T09:14:07Z",
  },
  {
    position: "Help Desk Technician",
    company: "Livepath",
    location: "Açu",
    status: "pending",
    mode: "internship",
    createdAt: "2023-05-31T02:30:02Z",
  },
  {
    position: "Information Systems Manager",
    company: "Katz",
    location: "Daojiang",
    status: "declined",
    mode: "internship",
    createdAt: "2023-01-07T10:45:47Z",
  },
  {
    position: "Budget/Accounting Analyst III",
    company: "Bubbletube",
    location: "Iperu",
    status: "pending",
    mode: "part-time",
    createdAt: "2023-06-19T05:20:55Z",
  },
  {
    position: "Chemical Engineer",
    company: "Thoughtmix",
    location: "Alenquer",
    status: "pending",
    mode: "internship",
    createdAt: "2023-06-09T08:52:18Z",
  },
  {
    position: "Recruiter",
    company: "Dynabox",
    location: "Ayna",
    status: "interview",
    mode: "internship",
    createdAt: "2023-12-03T20:49:43Z",
  },
  {
    position: "VP Sales",
    company: "Quaxo",
    location: "Yelenendorf",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-02-09T13:04:13Z",
  },
  {
    position: "Sales Associate",
    company: "Eazzy",
    location: "Ilha Solteira",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-08-31T17:30:53Z",
  },
  {
    position: "Marketing Manager",
    company: "Jabberstorm",
    location: "Tampa",
    status: "pending",
    mode: "part-time",
    createdAt: "2023-01-29T03:28:28Z",
  },
  {
    position: "Registered Nurse",
    company: "Thoughtbridge",
    location: "Feuknoni",
    status: "pending",
    mode: "full-time",
    createdAt: "2023-04-24T11:38:57Z",
  },
  {
    position: "Internal Auditor",
    company: "Tambee",
    location: "La Sarrosa",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-06-25T19:04:22Z",
  },
  {
    position: "Research Nurse",
    company: "Wordpedia",
    location: "Bualu",
    status: "interview",
    mode: "full-time",
    createdAt: "2023-02-06T01:34:16Z",
  },
  {
    position: "Social Worker",
    company: "Vidoo",
    location: "Aisai",
    status: "declined",
    mode: "internship",
    createdAt: "2023-07-20T22:55:08Z",
  },
  {
    position: "Nurse Practicioner",
    company: "Jabbercube",
    location: "Biloxi",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-04-06T13:35:17Z",
  },
  {
    position: "VP Quality Control",
    company: "Twinder",
    location: "Singkup",
    status: "interview",
    mode: "part-time",
    createdAt: "2023-02-16T05:50:34Z",
  },
];
