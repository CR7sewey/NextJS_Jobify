import { useQuery } from "@tanstack/react-query";
import { getAllJobsAction } from "./actions";

export function getJobs({
  search,
  jobStatus,
  pageNumber,
}: {
  search: string;
  jobStatus: string;
  pageNumber: number;
}) {
  return useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });
}
