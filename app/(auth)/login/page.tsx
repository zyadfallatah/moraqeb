import LoginForm from "@/components/forms/LoginForm";
import { getCurrentUser } from "@/lib/actions/authActions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="w-full lg:w-1/2 flex items-center justify-center flex-1">
          <div className="max-w-[550px] w-full space-y-8 p-10">
            <h2 className="text-4xl font-bold text-primary mb-16 text-center">
              تسجيل الدخول
            </h2>
            <LoginForm />

            {/* Test Credentials Section */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 text-center">
                بيانات الاختبار
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">رقم الهوية:</span>
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    1111100000
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">الرقم السري:</span>
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    Abcd1234-
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={"/images/login-image.png"}
          alt="Background"
          className="flex-1 hidden max-w-[700px] max-h-[1000px] lg:block"
          width={500}
          height={10}
        />
      </div>
    </div>
  );
}
