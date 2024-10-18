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
import { createJobAction } from "@/utils/actions";

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
    // console.log(values);
    const create = async () => {
      await createJobAction(values);
    };
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
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

          <Button type="submit" className="self-end capitalize">
            create job
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateJobForm;
