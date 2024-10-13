import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLink = {
  id: string;
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: NavLink[] = [
  {
    id: "1",
    href: "/add-job",
    label: "add job",
    icon: <Layers />,
  },
  {
    id: "2",
    href: "/jobs",
    label: "jobs",
    icon: <AppWindow />,
  },
  {
    id: "3",
    href: "/stats",
    label: "stats",
    icon: <AreaChart />,
  },
];
