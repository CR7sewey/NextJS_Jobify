import { getStatsAction } from "@/utils/actions";
import React from "react";

export default async function page() {
  const stats = getStatsAction();
  return <div>page</div>;
}
