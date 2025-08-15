import React from "react";

interface Props {
  title: string;
  info: string;
}

const LiscenseInfo = ({ title, info }: Props) => {
  return (
    <div className="flex flex-col gap-3 mb-5">
      <h3 className="text-xl">{title}</h3>
      <p className="border border-gray-300 bg-gray-200 py-1.5 px-4">{info}</p>
    </div>
  );
};

export default LiscenseInfo;
