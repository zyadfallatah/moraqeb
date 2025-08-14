import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  logo: string;
  service: string;
  href: string;
}

const HeaderService = ({ logo, service, href }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center p-4 shadow w-fit rounded-2xl px-8"
    >
      <Image
        src={`/assets/${logo}`}
        alt="Services"
        width={60}
        height={40}
        className="bg-[#F3FCF6] rounded-full size-12 p-2"
      />
      <p className="text-black">{service}</p>
    </Link>
  );
};

export default HeaderService;
