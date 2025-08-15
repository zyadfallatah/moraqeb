import { licenses } from "@/database/schema";
import React from "react";
import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import { getLicenseNotices } from "@/lib/actions/noticeActions";
import { cn } from "@/lib/utils";
import Link from "next/link";

type License = InferSelectModel<typeof licenses>;

const mapState = {
  info: {
    color: "bg-primary-dark",
    text: "مرخصة",
  },
  warning: {
    color: "bg-accent",
    text: "مهمل",
  },
  violation: {
    color: "bg-warning",
    text: "مخالف",
  },
};

const LeaseCard = async ({ lease }: { lease: License }) => {
  const notice = await getLicenseNotices(lease.licenseNumber);
  const { color, text } = mapState[notice?.[0]?.type ?? "info"];
  return (
    <div className="shadow bg-white w-fit min-w-[400px]  p-5 border">
      <div className="flex gap-4 justify-between items-start">
        <div className="flex gap-2">
          <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-xl font-bold">{lease.landNumber}</h3>
            <p className="text-gray-400">{lease.district}</p>
          </div>
        </div>
        <span
          className={cn(
            "rounded-2xl text-sm text-white w-fit p-1 px-2 flex gap-2 items-center",
            color
          )}
        >
          <span
            className={cn("rounded-full brightness-125 size-3 block", color)}
          ></span>
          {text}
        </span>
      </div>
      <Link
        href={`/lands/${lease.licenseNumber}`}
        className="border border-primary rounded-md p-2 text-primary block text-center mt-8"
      >
        التفاصيل
      </Link>
    </div>
  );
};

export default LeaseCard;
