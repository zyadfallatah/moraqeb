import Link from "next/link";
import React from "react";

const Service = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 bg-white shadow shadow-white p-4 max-w-[380px] min-h-[350px] rounded-[11px]">
      <h3 className="text-3xl font-bold text-primary">تنبيهات</h3>
      <p className="text-xl">
        يتم تحليل صورة ارضك بشكل مستمر، وعند مخالفتك لقانون ما، سيتم ابلاغك بشكل
        سريع
      </p>
      <Link
        href="#"
        className="bg-primary text-white w-full lg:max-w-[250px] p-2 rounded-sm"
      >
        اذهب
      </Link>
    </div>
  );
};

export default Service;
