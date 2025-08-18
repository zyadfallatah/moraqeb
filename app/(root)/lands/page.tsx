import ArcGISMap from "@/components/ArcGISMap";
import OnlySubscribed from "@/components/shared/OnlySubscribed";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getActiveLicensesWithNoticeType } from "@/lib/actions/noticeActions";
import { redirect } from "next/navigation";
import React from "react";
/*
  Usage with multiple leases
  <ArcGISMap
    leases={[
      {
        licenseNumber: "LIC-2024-001",
        licenseType: "residential",
        landArea: 500,
        landCoordinates: { latitude: 24.7136, longitude: 46.6753 },
        noticeType: "info"
      },
      {
        licenseNumber: "LIC-2024-002", 
        licenseType: "commercial",
        landArea: 1000,
        landCoordinates: { latitude: 24.7138, longitude: 46.6755 },
        noticeType: "warning"
      }
    ]}
    showLandMarking={true}
    zoomLevel={16}
    autoFit={true}
  />
*/
const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/login");
  }
  const licenses = await getActiveLicensesWithNoticeType(user.id);
  console.log(licenses);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-primary py-5 text-center mb-10">
        الأراضي
      </h1>
      <div className="text-center w-full mx-auto max-w-7xl min-h-[350px] shadow border rounded-xl grid place-items-center">
        <ArcGISMap
          leases={licenses}
          showLandMarking={true}
          zoomLevel={16}
          autoFit={true}
        />
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
      <OnlySubscribed showActive={true} />
    </div>
  );
};

export default Page;
