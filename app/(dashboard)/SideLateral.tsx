"use client";
import { Button } from "@/components/ui/button";
import { links as linkss } from "@/utils/links";
import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "@/assets/logo.svg";

function SideLateral() {
  const links = linkss;
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Image src={logo} alt="logo" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => {
          const isActivePage = pathname === link.href;
          const variant = isActivePage ? "default" : "ghost";
          return (
            <Button
              key={link.id}
              variant={variant}
              className="w-full mb-2 capitalize font-normal justify-start"
              asChild
            >
              <Link href={link.href} className="flex items-center gap-x-2 ">
                {link.icon} <span className="capitalize">{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}

export default SideLateral;
