import { getCurrentUser } from "@/lib/actions/authActions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");
  return (
    <div className="text-center space-y-6">
      <h2 className="text-4xl font-bold text-primary mb-8">
        مرحباً بك في مرقب
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          معلومات المستخدم
        </h3>
        <div className="space-y-3 text-right">
          <div>
            <span className="font-medium text-gray-700">الاسم: </span>
            <span className="text-gray-900">{user?.name}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">رقم الهوية: </span>
            <span className="text-gray-900">{user?.ssn}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
