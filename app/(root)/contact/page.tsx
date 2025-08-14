import ContactInfo from "@/components/cards/ContactInfo";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mt-32">
        <div>
          <h1 className="text-primary text-5xl font-bold">اتصل بنا</h1>
          <p className="text-black text-3xl mt-5">
            نحن هنا من أجلك! لأي سؤال أو ملاحظة، لا تتردد في التواصل معنا. 
          </p>
        </div>
        <Image src="/assets/logo.svg" alt="logo" width={150} height={100} />
      </div>

      <h2 className="text-3xl text-primary mt-20 mb-4">معلومات التواصل</h2>

      <main className="shadow space-y-5 shadow-[hsl(0,0%,80%)] p-6 mb-20">
        <ContactInfo />
        <ContactInfo />
      </main>
    </div>
  );
};

export default page;
