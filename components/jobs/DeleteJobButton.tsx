import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const DeleteJobButton = () => {
  return (
    <Button size="sm" asChild>
      <Link href="/">delete</Link>
    </Button>
  );
};

export default DeleteJobButton;
