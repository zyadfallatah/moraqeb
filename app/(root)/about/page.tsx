import AboutCards from "@/components/cards/AboutCards";
import React from "react";

const page = () => {
  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      <h1 className="text-primary text-5xl mt-20 font-bold">عن مرقب</h1>
      <p className="text-black text-xl md:text-2xl mt-5">
        مُرَقِّب هو منصة ذكية لإدارة وتحليل الأراضي في مكة المكرمة والمشاعر
        المقدسة، يربط الصكوك العقارية بالخرائط التفاعلية الرقمية ويستفيد من
        تقنيات الذكاء الاصطناعي وصور الأقمار الصناعية للكشف المبكر عن الإهمال،
        التعديات، والمخالفات.
      </p>

      <div className="border shadow shadow-[hsl(0,0%,80%)] rounded-3xl p-6 my-20">
        <h2 className="text-primary text-3xl font-bold">اختصاصات مرقب</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <AboutCards
            logo="about-1.svg"
            title="السرعة والدقة"
            description="مراقبة لحظية عن طريق الذكاء الاصطناعي وتنبيهات فورية للمستخدمين"
          />
          <AboutCards
            logo="about-2.svg"
            title="الجانب الأمني"
            description="حماية حقوق الملاك من خلال رصد أي تغييرات أو تعديات فور حدوثها"
          />
          <AboutCards
            logo="about-3.svg"
            title="مساعد استثماري"
            description="إصدار توصيات وتنبيهات ذكية لتحسين الاستثمار العقاري والتجاري"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
