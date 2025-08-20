// import Logout from "@/components/forms/Logout";
import LicsenseDetail from "@/components/cards/LicsenseDetail";
import LicsenseFeature from "@/components/cards/LicsenseFeature";
import ProfileLease from "@/components/cards/ProfileLease";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/authActions";
import { getUserLeases } from "@/lib/actions/leaseActions";
import { formatDate, getFirstName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<Record<string, string>>;
}) => {
  const { id } = await params;
  const user = await getUserById(id);
  const leases = await getUserLeases(id);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className="bg-[#FAFAFC] pt-6">
      <div className="max-w-7xl px-4 py-10 mx-auto shadow bg-white rounded-2xl">
        <div className="relative bg-[#E9F4EF] p-5">
          <h1 className="text-3xl py-10 font-bold text-primary text-center">
            لوحة معلوماتي
          </h1>
          <Image
            className="absolute -top-10 max-md:right-1/2 max-md:translate-x-1/2 md:top-1/2 md:-translate-y-1/2 bg-[#f4f4f4e2] rounded-full border border-primary shadow p-4 max-w-20 md:max-w-none"
            src="/assets/person.svg"
            alt="Profile"
            width={100}
            height={400}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-5 max-w-5xl mx-auto mt-20">
          <div className="flex flex-col">
            <label htmlFor="name">الاسم</label>
            <input
              className="text-gray-400 border rounded-sm p-2"
              type="text"
              id="name"
              name="name"
              value={getFirstName(user.fullName)}
              placeholder={getFirstName(user.fullName)}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">رقم الهوية</label>
            <input
              className="text-gray-400 border rounded-sm p-2"
              type="text"
              id="name"
              name="name"
              value={user?.ssn ?? ""}
              placeholder={user?.ssn ?? ""}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">تاريخ الميلاد الهجري</label>
            <input
              className="text-gray-400 border rounded-sm p-2"
              type="text"
              id="name"
              name="name"
              value={formatDate(user.birthDate!)}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">تاريخ الميلاد الميلادي</label>
            <input
              className="text-gray-400 border rounded-sm p-2"
              type="text"
              id="name"
              name="name"
              value={formatDate(user.birthDate!)}
              placeholder={getFirstName(user.fullName)}
              disabled
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold my-5">الصكوك الخاصة بي</h2>
          <div className="grid grid-cols-1 max-h-[400px] overflow-y-scroll md:grid-cols-3 gap-x-10  gap-y-6 shadow p-5">
            {leases.map((lease) => (
              <ProfileLease
                key={lease.licenseNumber}
                title={`قطعة ${lease.landNumber} , ${lease.district}`}
                leaseNumber={lease.licenseNumber}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
