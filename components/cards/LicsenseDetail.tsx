import React from "react";

interface Props {
  title: string;
  description: string;
}

const LicsenseDetail = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-3 text-center">
      <h3 className="text-[hsla(0,0%,0%,69%)] text-2xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-[hsla(0,0%,0%,90%)] text-sm font-bold">
        {description}
      </p>
    </div>
  );
};

export default LicsenseDetail;
