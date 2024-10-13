import React from "react";
import { UserButton } from "@clerk/nextjs";

import ThemeToggle from "./ThemeToggle";
import LinksDropdown from "./LinksDropdown";

export default function Navbar() {
  return (
    <>
      <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
        <div>
          <LinksDropdown />
        </div>
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </nav>
    </>
  );
}
