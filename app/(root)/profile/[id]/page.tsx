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
            className="absolute top-1/2 -translate-y-1/2 bg-[#f4f4f4e2] rounded-full border border-primary shadow p-4"
            src="/assets/person.svg"
            alt="Profile"
            width={100}
            height={400}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-20 gap-y-5 max-w-5xl mx-auto mt-20">
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
          <div className="grid grid-cols-3 gap-x-10 shadow p-5">
            {leases.map((lease) => (
              <ProfileLease
                key={lease.licenseNumber}
                title={`${lease.landNumber} , ${lease.district}`}
                leaseNumber={lease.licenseNumber}
              />
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 ">
          <h2 className="text-2xl font-bold my-5">سجل صفقات الأراضي والعقود</h2>
          <div className="grid grid-cols-3 gap-x-10 shadow p-5">
            {leases.map((lease) => (
              <ProfileLease
                key={lease.licenseNumber}
                title={`${lease.landNumber} , ${lease.district}`}
                leaseNumber={lease.licenseNumber}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#E9F4EF] text-center pt-36 pb-9">
        <h2 className="text-[#0A3929] font-bold text-5xl">رخصة مرقب</h2>
        <p className="text-2xl text-gray-500">يتجدد خلال 4 أشهر</p>
      </div>

      <div className="bg-[#FFFEFC] py-20 px-6 rounded-t-2xl">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="flex flex-1 flex-col items-center">
            <h3 className="text-4xl font-bold text-black">المزايا</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-5 max-w-5xl mx-auto mt-10">
              <LicsenseFeature />
              <LicsenseFeature />
              <LicsenseFeature />
              <LicsenseFeature />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <h3 className="text-4xl font-bold text-black mb-10">
              تفاصيل الاشتراك
            </h3>
            <div className="bg-white w-full flex justify-center  border border-[hsla(0,0%,0%,37%)] rounded-4xl p-4 shadow divide-x-2">
              <LicsenseDetail
                title="نوع الاشتراك"
                description={`رخصة لمدة 360 يومًا`}
              />
              <LicsenseDetail
                title="نوع الاشتراك"
                description={`رخصة لمدة 360 يومًا`}
              />
              <LicsenseDetail
                title="نوع الاشتراك"
                description={`رخصة لمدة 360 يومًا`}
              />
            </div>

            <Link
              href="#"
              className="w-full text-2xl mt-5 cursor-pointer block"
            >
              <Button className="w-full p-7 text-2xl cursor-pointer">
                الــــــغــــاء تـــجـــديـــد الاشـــــتــــراك
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
