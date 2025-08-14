import Image from "next/image";
import React from "react";

const ContactInfo = () => {
  return (
    <div className="flex gap-3">
      <Image
        src="/assets/contact-phone.svg"
        alt="phone"
        width={50}
        height={50}
      />
      <div className="ml-4">
        <h3 className="text-[hsla(0,0%,0%,65%)] text-2xl">رقم الاتصال</h3>
        <p className="text-accent text-xl">0506929945 </p>
      </div>
    </div>
  );
};

export default ContactInfo;
