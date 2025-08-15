import ArcGISMap from "@/components/ArcGISMap";
import LeaseCard from "@/components/cards/LeaseCard";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getUserLeases } from "@/lib/actions/leaseActions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }
  const leases = await getUserLeases(user.id);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-primary py-5 text-center mb-10">
        الأراضي
      </h1>
      <div className="text-center w-full mx-auto max-w-7xl min-h-[350px] shadow border rounded-xl grid place-items-center">
        <ArcGISMap latitude={21.4225} longitude={39.8262} noticeType="info" />
      </div>
      <div className="flex max-w-7xl mx-auto mt-4 gap-5 mb-12">
        <div className="flex items-center gap-2">
          <span className="min-w-[60px] h-5 bg-primary-dark rounded-full"></span>
          <p>مرخصة</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[60px] h-5 bg-accent rounded-full"></span>
          <p>مهمل</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[60px] h-5 bg-warning rounded-full"></span>
          <p>مخالف</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 gap-5 mb-12">
        {leases.map((lease) => (
          <LeaseCard key={lease.licenseNumber} lease={lease} />
        ))}
      </div>
    </div>
  );
};

export default Page;
