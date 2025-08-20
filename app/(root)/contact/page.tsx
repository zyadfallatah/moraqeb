import ContactInfo from "@/components/cards/ContactInfo";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center md:flex-row justify-between mt-32">
        <div>
          <h1 className="text-primary text-center text-3xl md:text-5xl md:text-right font-bold">
            اتصل بنا
          </h1>
          <p className="text-black text-center text-xl md:text-right md:text-2xl mt-5">
            نحن هنا من أجلك! لأي سؤال أو ملاحظة، لا تتردد في التواصل معنا. 
          </p>
        </div>
        <Image src="/assets/logo.svg" alt="logo" width={150} height={100} />
      </div>

      <h2 className="text-3xl text-primary mt-20 mb-4">معلومات التواصل</h2>

      <main className="shadow space-y-5 shadow-[hsl(0,0%,80%)] p-6 mb-20">
        <ContactInfo
          logo="contact-phone.svg"
          title="رقم الاتصال"
          description="0506929945"
        />
        <ContactInfo
          logo="contact-mail.svg"
          title="البريد"
          description="Muraqep@info.sa"
        />
      </main>
    </div>
  );
};

export default page;
