"use client";
import { cn } from "@/lib/utils";
import { ArrowBigLeft } from "lucide-react";
import React from "react";

const ArrowBack = ({ className }: { className?: string }) => {
  return (
    <>
      <ArrowBigLeft
        className={cn(
          "bg-accent rounded-md size-10 p-2 cursor-pointer",
          className
        )}
        onClick={() => window.history.back()}
      />
    </>
  );
};

export default ArrowBack;
