import Image from "next/image";
import React from "react";

interface Props {
  logo: string;
  title: string;
  description: string;
}

const ContactInfo = ({ title, description, logo }: Props) => {
  return (
    <div className="flex gap-3">
      <Image src={`/assets/${logo}`} alt="phone" width={50} height={50} />
      <div className="ml-4">
        <h3 className="text-[hsla(0,0%,0%,65%)] text-2xl">{title}</h3>
        <p className="text-accent text-sm font-bold">{description}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
