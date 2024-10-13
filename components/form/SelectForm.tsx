import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, ControllerRenderProps } from "react-hook-form";
import { JobMode, JobStatus } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

function SelectForm({
  label,
  control,
  name,
  values,
}: {
  label: string;
  control: Control<any>;
  name: string;
  values: Array<JobMode | JobStatus>;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((val) => {
                return (
                  <SelectItem value={val} key={val}>
                    {val}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectForm;
