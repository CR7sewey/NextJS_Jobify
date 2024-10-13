import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { JobMode, JobStatus } from "@/utils/types";
import { Control } from "react-hook-form";

type FieldForm = ControllerRenderProps<
  {
    location: string;
    position: string;
    company: string;
    jobstatus: JobStatus;
    jobmode: JobMode;
  },
  "company"
>;

function InputForm({
  label,
  control,
  name,
  placeholder = "",
  description = "",
}: {
  label: string;
  control: Control<any>;
  name: string;
  placeholder?: string;
  description?: string;
}) {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default InputForm;
