import AboutCards from "@/components/cards/AboutCards";
import React from "react";

const page = () => {
  return (
    <div className="px-4 sm:px-6  max-w-7xl mx-auto">
      <h1 className="text-primary text-6xl mt-20 font-bold">عن مرقب</h1>
      <p className="text-black text-3xl mt-5">
        مُرَقِّب هو منصة ذكية لإدارة وتحليل الأراضي في مكة المكرمة والمشاعر
        المقدسة، يربط الصكوك العقارية بالخرائط التفاعلية الرقمية ويستفيد من
        تقنيات الذكاء الاصطناعي وصور الأقمار الصناعية للكشف المبكر عن الإهمال،
        التعديات، والمخالفات.
      </p>

      <div className="border shadow shadow-[hsl(0,0%,80%)] rounded-3xl p-6 my-20">
        <h2 className="text-primary text-2xl font-bold">specializations</h2>
        <div className="flex gap-4">
          <AboutCards />
          <AboutCards />
          <AboutCards />
        </div>
      </div>
    </div>
  );
};

export default page;
