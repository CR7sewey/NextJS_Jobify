import React from "react";
import { links } from "@/utils/links";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LucideAlignLeft, AlignLeft } from "lucide-react";

export default function LinksDropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="lg:hidden" asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex gap-4 max-w-[100px]"
          >
            <LucideAlignLeft className="w-6 h-6" />
            <span className="sr-only">Toggle links</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-52 lg:hidden "
          align="start"
          sideOffset={25}
        >
          {links.map((vals) => {
            return (
              <DropdownMenuItem key={vals.id} asChild>
                <Link href={vals.href} className="flex items-center gap-x-2 ">
                  {vals.icon} <span className="capitalize">{vals.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
