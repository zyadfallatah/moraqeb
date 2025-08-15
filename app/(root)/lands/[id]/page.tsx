import NoticeCard from "@/components/cards/NoticeCard";
import ArrowBack from "@/components/shared/ArrowBack";
import OnlySubscribed from "@/components/shared/OnlySubscribed";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getLease } from "@/lib/actions/leaseActions";
import { getLicenseNotices } from "@/lib/actions/noticeActions";
import { redirect } from "next/navigation";
import React from "react";
import ArcGISMap from "@/components/ArcGISMap";

const page = async ({
  params,
}: {
  params: Promise<Record<string, string>>;
}) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const landLease = await getLease(id);
  const notices = await getLicenseNotices(id);

  if (!user) redirect("/login");

  if (!landLease) return <div>Land not found</div>;

  if (landLease.at(0)?.userId !== user?.id) {
    return <div>You are not the owner of this land</div>;
  }

  const { landNumber, district } = landLease.at(0)!;

  // Determine notice type for map marker color
  const noticeType = notices && notices.length > 0 ? notices[0].type : "info";

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-primary py-5 text-center my-10 flex-1">
          {landNumber} ، {district}
        </h1>
        <ArrowBack />
      </div>

      <div className="text-center w-full mx-auto min-h-[350px] shadow border rounded-xl grid place-items-center">
        <ArcGISMap
          latitude={21.4225}
          longitude={39.8262}
          noticeType={noticeType}
        />
      </div>

      <OnlySubscribed>
        {notices!.length > 0 && notices && (
          <div className="flex flex-col gap-5 justify-center items-center mt-10 mb-5">
            {notices?.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}
      </OnlySubscribed>
    </div>
  );
};

export default page;
