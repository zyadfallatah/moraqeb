import Link from "next/link";
import React from "react";

const Service = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6 bg-white shadow shadow-white p-4 sm:p-6 w-full lg:max-w-[380px] min-h-[280px] sm:min-h-[320px] lg:min-h-[350px] rounded-[11px]">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
        تنبيهات
      </h3>
      <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
        يتم تحليل صورة ارضك بشكل مستمر، وعند مخالفتك لقانون ما، سيتم ابلاغك بشكل
        سريع
      </p>
      <Link
        href="#"
        className="bg-primary text-white w-full lg:max-w-[250px] p-2 sm:p-3 rounded-sm text-sm sm:text-base hover:bg-primary-dark transition-colors"
      >
        اذهب
      </Link>
    </div>
  );
};

export default Service;
