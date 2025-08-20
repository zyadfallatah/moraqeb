import ArcGISMap from "@/components/ArcGISMap";
import LeaseCard from "@/components/cards/LeaseCard";
import OnlySubscribed from "@/components/shared/OnlySubscribed";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getActiveLicensesWithNoticeType } from "@/lib/actions/noticeActions";
import { getAllLicensesIncludeSubscriptions } from "@/lib/actions/subscriptionActions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }
  const licensesWithNotices = await getActiveLicensesWithNoticeType(user.id);
  const licnesesWithSubscriptions = await getAllLicensesIncludeSubscriptions(
    user.id
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-primary py-5 text-center mb-10">
        الأراضي
      </h1>
      <div className="text-center w-full mx-auto max-w-7xl min-h-[350px] shadow border rounded-xl grid place-items-center">
        <ArcGISMap
          leases={licensesWithNotices}
          showLandMarking={true}
          zoomLevel={18}
          autoFit={true}
        />
      </div>
      <div className="flex max-w-7xl mx-auto mt-4 gap-5 mb-12">
        <div className="flex items-center gap-2">
          <span className="min-w-[45px] md:min-w-[60px] h-5 bg-primary-dark rounded-full"></span>
          <p>مرخصة</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[45px]  md:min-w-[60px] h-5 bg-accent rounded-full"></span>
          <p>مهمل</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="min-w-[45px]  md:min-w-[60px] h-5 bg-warning rounded-full"></span>
          <p>مخالف</p>
        </div>
      </div>
      <OnlySubscribed>
        <div className="max-w-7xl mx-auto mt-4 gap-5 mb-12 grid md:grid-cols-2 lg:grid-cols-3">
          {licnesesWithSubscriptions!.map((lease) => (
            <LeaseCard
              key={lease.license.licenseNumber}
              lease={lease.license}
              subscription={lease.subscription!}
            />
          ))}
        </div>
      </OnlySubscribed>
    </div>
  );
};

export default Page;
