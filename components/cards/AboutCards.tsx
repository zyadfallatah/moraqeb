import Image from "next/image";
import React from "react";

const AboutCards = () => {
  return (
    <div className="border space-y-2 border-[hsl(0,0%,80%)] rounded-4xl p-6 mt-10 flex-1">
      <Image
        src="/assets/about-1.svg"
        alt="about"
        width={24}
        height={24}
        className="bg-[#F3FCF6] rounded-full size-8 p-1"
      />
      <h3 className="text-[#1F2A37] text-2xl">السرعة والدقة</h3>
      <p className="text-[hsla(212,28%,17%,73%)] text-xl">
        مراقبة لحظية عن طريق الذكاء الاصطناعي وتنبيهات فورية للمستخدمين
      </p>
    </div>
  );
};

export default AboutCards;
