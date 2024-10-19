import JobsDisplay from "@/components/jobs/JobsDisplay";
import JobSearch from "@/components/jobs/JobSearch";
import { getAllJobsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams?: { search?: string; jobStatus?: string };
}) {
  const search = searchParams?.search || "";
  const jobStatus = searchParams?.jobStatus || "all";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs", search, jobStatus, 1],
    queryFn: () => getAllJobsAction({ search, jobStatus }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobSearch />
      <JobsDisplay />
    </HydrationBoundary>
  );
}
