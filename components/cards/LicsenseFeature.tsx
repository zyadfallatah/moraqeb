import Image from "next/image";
import React from "react";

const LicsenseFeature = () => {
  return (
    <div className="flex flex-col lg:flex-row text-center md:text-right items-center bg-white border border-[hsla(0,0%,0%,32%)] rounded-4xl p-4 shadow gap-7">
      <Image
        src="/assets/ring-round.svg"
        alt="Licsense"
        width={40}
        height={40}
      />
      <p className="text-xl font-bold max-w-[170px]">توصيات ذكيه مخصصه لأرضك</p>
    </div>
  );
};

export default LicsenseFeature;
