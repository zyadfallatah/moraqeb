import ArrowBack from "@/components/shared/ArrowBack";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getActiveLicenseWithNoticeType } from "@/lib/actions/noticeActions";
import { getRecommendationsByLicenseNumber } from "@/lib/actions/recommendation";
import Image from "next/image";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<Record<string, string>>;
}) => {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const licenses = await getActiveLicenseWithNoticeType(user.id, id);
  const recommendations = await getRecommendationsByLicenseNumber(id);

  if (!recommendations) {
    return redirect(`/recommendation`);
  }

  return (
    <div className="py-10 min-h-[calc(100vh-4rem-334px)]">
      <div className="flex items-center max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-primary py-5 text-center flex-1">
          قطعة {licenses?.landNumber} ، {licenses?.district}
        </h1>
        <ArrowBack />
      </div>

      <div className="bg-[#FFF9E8] p-8 max-w-7xl rounded-xl mx-auto">
        <p>
          تشير بيانات النظام إلى أن الأرض مهملة لم يتم استخدامها خلال السنوات
          الماضية.
          <br />
          نوصي باتخاذ أحد الإجراءات التالية لتعزيز الاستفادة منها
        </p>
      </div>

      {recommendations?.length === 0 ? (
        <div className="max-w-7xl mx-auto mt-10 text-center">
          لا توجد توصيات حالياً
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-10 shadow py-5 px-7">
          <div className="flex items-center gap-2 mb-6">
            <Image
              className="max-w-8"
              src="/assets/warning.svg"
              alt="Logo"
              width={100}
              height={100}
            />
            <h2>ارضك مهمله، هذه نصائح قد تفيدك</h2>
          </div>
          <div className="space-y-5">
            {recommendations?.map(({ recommendation: { id, message } }) => {
              return (
                <p
                  key={id}
                  className="max-w-4xl border rounded-2xl shadow-md p-5 py-7 text-[1.25rem]"
                >
                  {message}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
