"use client";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import { JobType } from "@/utils/types";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import DeleteJobButton from "./DeleteJobButton";
import { Badge } from "../ui/badge";

const JobCard = ({ job }: { job: JobType }) => {
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>{" "}
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex gap-x-2 items-center">
          <Briefcase /> {job.status}
        </div>
        <div className="flex gap-x-2 items-center">
          <CalendarDays /> {new Date(job.createdAt).toLocaleDateString()}
        </div>
        <div className="flex gap-x-2 items-center">
          <MapPin /> {job.location}
        </div>
        <Badge className="w-32  justify-center">
          <div className="flex gap-x-2 items-center">
            <RadioTower className="w-4 h-4" /> Interview
          </div>
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button size="sm" asChild>
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>{" "}
        {/*<DeleteJobButton id={job.id} />*/}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
