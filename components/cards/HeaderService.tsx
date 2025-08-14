import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderService = () => {
  return (
    <Link
      href="/lands"
      className="flex items-center p-4 shadow w-fit rounded-2xl px-8"
    >
      <Image
        src="/assets/about-1.svg"
        alt="Services"
        width={60}
        height={40}
        className="bg-[#F3FCF6] rounded-full size-12 p-2"
      />
      <p className="text-black">تتبع الأراضي</p>
    </Link>
  );
};

export default HeaderService;
