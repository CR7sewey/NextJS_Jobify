"use client";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import React from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form } from "../ui/form";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSingleJobAction, updateJobAction } from "@/utils/actions";

export const EditJobForm = ({ jobId }: { jobId: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getSingleJobAction(jobId),
  });
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || "",
      company: data?.company || "",
      location: data?.location || "",
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  const { mutate: updateJob, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "there was an error",
        });
        return;
      }
      toast({ description: "job updated" });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      router.push("/jobs");
      // form.reset();
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    updateJob(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">edit job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          <InputForm
            control={form.control}
            name="position"
            label="Position"
            placeholder="Ex: Software Engineer"
          />
          <InputForm
            control={form.control}
            name="company"
            label="Company"
            placeholder="Ex: Microsoft"
          />
          <InputForm
            control={form.control}
            name="location"
            label="Location"
            placeholder="Ex: Portugal"
          />

          <SelectForm
            control={form.control}
            name="jobstatus"
            label="Job Status"
            values={Object.values(JobStatus)}
          />
          <SelectForm
            control={form.control}
            name="jobmode"
            label="Job Mode"
            values={Object.values(JobMode)}
          />

          <Button
            type="submit"
            className="self-end capitalize"
            disabled={isPending}
          >
            {isPending ? "loading..." : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
