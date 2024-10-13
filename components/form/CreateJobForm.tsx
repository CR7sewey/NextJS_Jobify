"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "../ui/form";
import { Button } from "@/components/ui/button";
import {
  createAndEditJobSchema,
  CreateAndEditJobType,
  JobMode,
  JobStatus,
} from "@/utils/types";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";

function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      jobstatus: JobStatus.Pending,
      jobmode: JobMode.FullTime,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: CreateAndEditJobType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          values={[JobStatus.Pending, JobStatus.Interview, JobStatus.Declined]}
        />
        <SelectForm
          control={form.control}
          name="jobmode"
          label="Job Mode"
          values={[JobMode.FullTime, JobMode.PartTime, JobMode.Internship]}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateJobForm;
