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
