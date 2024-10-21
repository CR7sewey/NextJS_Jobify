"use client";
import { getChartsAction } from "@/utils/actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export const ChartsJobs = () => {
  const data = [
    { date: "Dec 22", count: 96 },
    { date: "Jan 23", count: 192 },
    { date: "Feb 23", count: 264 },
    { date: "Mar 23", count: 48 },
    { date: "Apr 23", count: 216 },
    { date: "May 23", count: 96 },
    { date: "Jun 23", count: 288 },
    { date: "Jul 23", count: 264 },
    { date: "Aug 23", count: 240 },
    { date: "Sep 23", count: 168 },
    { date: "Oct 23", count: 192 },
    { date: "Nov 23", count: 192 },
    { date: "Dec 23", count: 144 },
    { date: "Oct 24", count: 2 },
  ]; // || (await getChartsAction());
  console.log(data);
  if (!data || data.length < 1) return null;

  return (
    <section className="mt-16">
      <h1 className="text-4xl font-semibold text-center">
        Monthly Applications
      </h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
