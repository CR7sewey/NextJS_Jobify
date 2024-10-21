import React from "react";
import { StatsCards } from "./LoadingContainer";
import { getStatsAction } from "@/utils/actions";

export const StatsJobs = async () => {
  const data = await getStatsAction();
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCards title="pending jobs" value={data?.pending || 0} />
      <StatsCards title="interviews set" value={data?.interview || 0} />
      <StatsCards title="jobs declined" value={data?.declined || 0} />
    </div>
  );
};
