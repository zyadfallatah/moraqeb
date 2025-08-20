import { getCurrentUser } from "@/lib/actions/authActions";
import { getActiveLicensesWithNoticeType } from "@/lib/actions/noticeActions";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const licenses = await getActiveLicensesWithNoticeType(user.id);
  const recommendations = licenses?.filter(
    ({ noticeType }) => noticeType === "warning"
  );
  return (
    <div className="py-10 min-h-[calc(100vh-4rem-334px)]">
      <h1 className="text-4xl text-primary text-center font-bold mb-5">
        الــتـــــوصــــــيــــــــــــات
      </h1>

      <div className="bg-[#FFF9E8] p-8 max-w-7xl rounded-xl mx-auto">
        مرحبًا بك في لوحة التوصيات المجمّعة
        <p className="mt-5">
          في هذه الصفحة، ستجد جميع التوصيات الخاصة بأراضيك مُرتبة في مكان واحد،
          لتمنحك رؤية شاملة تساعدك على اتخاذ قرارات <br />
          تطوير مدروسة مبنية على تحليل دقيق لموقع الأرض وظروفها المحيطة
        </p>
      </div>

      {recommendations?.length === 0 && (
        <div className="max-w-7xl mx-auto mt-10 text-center">
          لا توجد توصيات حالياً
        </div>
      )}

      {recommendations?.map(
        ({ landNumber, district, licenseNumber, noticeMessage }) => {
          return (
            <div
              key={licenseNumber}
              className="max-w-7xl mx-auto shadow-md rounded-lg px-10 py-8 mt-5 flex items-center justify-between"
            >
              <div>
                <h2 className="text-accent text-2xl font-bold">
                  {district} ، قطعة {landNumber}
                </h2>

                <p className="mt-4">{noticeMessage}</p>
              </div>
              <Link href={`/recommendation/${licenseNumber}`}>
                <button className="bg-primary text-white px-32 py-2 rounded-sm mt-5 cursor-pointer">
                  اذهب
                </button>
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default page;
