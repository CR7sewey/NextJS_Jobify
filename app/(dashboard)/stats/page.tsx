import { ChartsJobs } from "@/components/jobs/ChartsJobs";
import { StatsJobs } from "@/components/jobs/StatsJobs";
import { getChartsAction, getStatsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsAction(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsJobs />
      <ChartsJobs />
    </HydrationBoundary>
  );
}
