"use client";
import { ArrowBigLeft } from "lucide-react";
import React from "react";

const ArrowBack = () => {
  return (
    <>
      <ArrowBigLeft
        className="bg-accent rounded-md size-10 p-2 cursor-pointer"
        onClick={() => window.history.back()}
      />
    </>
  );
};

export default ArrowBack;
