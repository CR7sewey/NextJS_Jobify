import { getAllJobsAction } from "@/utils/actions";
import React from "react";

async function JobsDisplay() {
  const jobs = await getAllJobsAction({ search: "", jobStatus: "" });
  console.log(jobs);
  return <>JobsDisplay</>;
}

export default JobsDisplay;
