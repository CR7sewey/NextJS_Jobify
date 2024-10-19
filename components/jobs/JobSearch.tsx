"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem } from "../ui/select";
import { SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { JobStatus } from "@/utils/types";
import { Button } from "../ui/button";

const JobSearch = () => {
  const searchParameters = useSearchParams();
  const [search, setSearch] = useState(
    searchParameters.get("search")?.toString() || ""
  );
  const [jobStatus, setJobStatus] = useState(
    searchParameters.get("jobStatus")?.toString() || "all"
  );
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // get all of them
    const searchedParams = Object.fromEntries(formData);
    setSearch(searchedParams.search as string);
    setJobStatus(searchedParams.jobSatus as string);
    const urlParams = new URLSearchParams();
    urlParams.set("search", searchedParams.search as string);
    urlParams.set("jobStatus", searchedParams.jobStatus as string);
    router.push(`${pathname}?${urlParams.toString()}`);

    // reset values
    e.currentTarget.reset();
  };

  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        placeholder="search job ..."
        name="search"
        defaultValue={search}
      />
      <Select defaultValue={jobStatus} name="jobStatus">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((jobStatus) => {
            return (
              <SelectItem key={jobStatus} value={jobStatus}>
                {jobStatus}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default JobSearch;
