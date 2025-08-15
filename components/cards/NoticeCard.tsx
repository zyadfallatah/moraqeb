import { Notice } from "@/database/schema";
import { info } from "console";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const mapIcons = {
  warning: "/assets/warning.svg",
  violation: "/assets/violation.svg",
  info: "/assets/logo.svg",
};

const NoticeCard = ({ notice }: { notice: Notice }) => {
  const { type, message } = notice;
  const icon = mapIcons[type];
  return (
    <div className="shadow shadow-[#747474] w-full flex justify-between items-center py-5 px-10 gap-5">
      <div className="flex items-center gap-5">
        <Image
          src={icon}
          alt="Logo"
          width={40}
          height={40}
          className="size-8"
        />
        <p>{message}</p>
      </div>

      {type === "warning" && (
        <Link
          href="#"
          className="bg-primary text-white rounded-2-xl px-5 py-2 min-w-[250px] text-center text-lg"
        >
          اذهب
        </Link>
      )}
    </div>
  );
};

export default NoticeCard;
