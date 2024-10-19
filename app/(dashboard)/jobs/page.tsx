import JobsDisplay from "@/components/jobs/JobsDisplay";
import JobSearch from "@/components/jobs/JobSearch";
import { getAllJobsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({ search: "", jobStatus: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobSearch />
      <JobsDisplay />
    </HydrationBoundary>
  );
}
