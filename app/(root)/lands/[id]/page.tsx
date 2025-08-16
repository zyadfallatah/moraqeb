import NoticeCard from "@/components/cards/NoticeCard";
import ArrowBack from "@/components/shared/ArrowBack";
import OnlySubscribed from "@/components/shared/OnlySubscribed";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getLease } from "@/lib/actions/leaseActions";
import { getLicenseNotices } from "@/lib/actions/noticeActions";
import { redirect } from "next/navigation";
import React from "react";
import ArcGISMap from "@/components/ArcGISMap";
import LiscenseInfo from "@/components/cards/LiscenseInfo";
import { formatDate } from "@/lib/utils";
/*
  commercial: "تجاري",
  residential: "سكني",
  agricultural: "زراعي",
  industrial: "صناعي",
  government: "حكومي",
  other: "آخر",
*/
const mapPermissions = {
  resident: "سكني",
  market: "تجاري",
};

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

  const {
    landNumber,
    district,
    licenseNumber,
    licenseArea,
    permission,
    lastUpdated,
    createdAt,
    north,
    south,
    east,
    west,
  } = landLease.at(0)!;
  const permissionName = mapPermissions[permission];

  // Determine notice type for map marker color
  // const noticeType = notices && notices.length > 0 ? notices[0].type : "info";

  return (
    <div className="max-w-7xl mx-auto py-5">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-primary py-5 text-center my-10 flex-1">
          {landNumber} ، {district}
        </h1>
        <ArrowBack />
      </div>

      <div className="text-center w-full mx-auto min-h-[350px] shadow border rounded-xl grid place-items-center">
        {/* <ArcGISMap
          latitude={21.4225}
          longitude={39.8262}
          noticeType={noticeType}
        /> */}
      </div>

      <OnlySubscribed>
        {notices!.length > 0 && notices && (
          <div className="flex flex-col gap-5 justify-center items-center mt-10 mb-5">
            {notices?.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}

        <div className="max-w-7xl bg-white shadow shadow-black py-4 px-20">
          <h2 className="text-primary text-3xl text-center">معلومات الصك</h2>
          <LiscenseInfo
            title="اسم الأرض"
            info={`${district} ، ${landNumber}`}
          />
          <LiscenseInfo title="رقم الصك" info={licenseNumber} />
          <LiscenseInfo title="المساحة" info={`${licenseArea} م²`} />
          <LiscenseInfo title="الإستخدام المصرح" info={permissionName} />
          <LiscenseInfo title="آخر تحديث" info={formatDate(lastUpdated!)} />
          <LiscenseInfo title="تاريخ الصك" info={formatDate(createdAt!)} />

          <table
            className="w-full text-center mt-6"
            cellSpacing={0}
            cellPadding={12}
          >
            <thead>
              <tr className="bg-primary text-white font-semibold">
                <th className="py-3 px-4 border border-gray-300">الاتجاه</th>
                <th className="py-3 px-4 border border-gray-300">المسافة</th>
              </tr>
            </thead>
            <tbody className="border border-gray-300 bg-gray-50 text-sm">
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 border border-gray-300 font-medium">
                  شمالاً
                </td>
                <td className="py-3 px-4 border border-gray-300">{north}</td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 border border-gray-300 font-medium">
                  جنوباً
                </td>
                <td className="py-3 px-4 border border-gray-300">{south}</td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 border border-gray-300 font-medium">
                  شرقاً
                </td>
                <td className="py-3 px-4 border border-gray-300">{east}</td>
              </tr>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="py-3 px-4 border border-gray-300 font-medium">
                  غرباً
                </td>
                <td className="py-3 px-4 border border-gray-300">{west}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </OnlySubscribed>
    </div>
  );
};

export default page;
