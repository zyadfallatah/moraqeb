import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  link: string;
}

const Service = ({ title, description, link }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6 bg-white shadow shadow-white p-4 sm:p-6 w-full lg:max-w-[380px] min-h-[220px] sm:min-h-[320px] lg:min-h-[250px] rounded-[11px]">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
        {title}
      </h3>
      <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Service;
