import { getCurrentUser } from "@/lib/actions/authActions";
import { getActiveLicensesWithNoticeType } from "@/lib/actions/noticeActions";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  const licenses = await getActiveLicensesWithNoticeType(user.id);
  return (
    <div className="py-10 min-h-[calc(100vh-4rem-334px)]">
      <h1 className="text-4xl text-primary text-center font-bold mb-5">
        الــتنـــبــــيـــــهـــــــــات
      </h1>

      <div className="bg-[#FFF9E8] p-8 max-w-7xl rounded-xl mx-auto">
        في هذه الصفحة، تظهر لك جميع التنبيهات المرتبطة بأراضيك، قد تكون ناتجة
        عن:
        <br />
        <ul>
          <li>- تجاوزات أو استخدامات غير نظامية من قبلك </li>
          <li>- تعديات من أطراف خارجية على أرضك دون إذن أو تصريح</li>
        </ul>
        <p className="mt-5">
          نوصي بالاطلاع على كل تنبيه واتخاذ الإجراء المناسب لضمان سلامة وضع
          الأرض، وتفادي أي غرامات أو إجراءات لاحقة
        </p>
      </div>

      {licenses?.length === 0 && (
        <div className="max-w-7xl mx-auto mt-10 text-center">
          لا توجد تنبيهات حالياً
        </div>
      )}

      {licenses?.map(
        ({
          noticeType,
          landNumber,
          district,
          licenseNumber,
          noticeMessage,
        }) => {
          if (noticeType !== "violation") return null;

          return (
            <div
              key={licenseNumber}
              className="max-w-7xl mx-auto shadow-md rounded-lg px-10 py-8 mt-5"
            >
              <h2 className="text-[#B42318] text-2xl font-bold">
                {district} ، قطعة {landNumber}
              </h2>

              <p className="mt-4">{noticeMessage}</p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default page;
