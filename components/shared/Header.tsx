import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/authActions";
import Image from "next/image";
import Link from "next/link";
import HeaderService from "../cards/HeaderService";
import Logout from "../forms/Logout";
import { getFirstName } from "@/lib/utils";

export default async function Header({ hideLogin }: { hideLogin?: boolean }) {
  const user = await getCurrentUser();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-5">
            <Image src={"/assets/logo.svg"} alt="Logo" width={40} height={40} />

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                عن مرقب
              </Link>
              <div className="group text-gray-700 hover:text-green-600 font-medium flex items-center gap-1 py-5  cursor-pointer">
                <p>الخدمات</p>
                <Image
                  src="/assets/arrow.svg"
                  alt="Arrow down"
                  width={15}
                  height={10}
                />
                <div className="-z-50 absolute opacity-0 duration-[400ms] w-full p-5 shadow bg-white top-[10rem] group-hover:block group-hover:z-10 group-hover:top-[4rem] group-hover:opacity-100 right-1/2 translate-x-1/2 max-w-7xl">
                  <h2 className="text-xl font-bold mb-3">الخدمات</h2>
                  <nav className="flex gap-5">
                    <HeaderService
                      href="/lands"
                      logo="about-1.svg"
                      service="تتبع الأراضي"
                    />
                    <HeaderService
                      href="/subscription"
                      logo="about-2.svg"
                      service="ترخيص ملبي"
                    />
                    <HeaderService
                      href="/recommendation"
                      logo="warning.svg"
                      service="التوصيات"
                    />
                    <HeaderService
                      href="/alerts"
                      logo="violation.svg"
                      service="التنبيهات"
                    />
                  </nav>
                </div>
              </div>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                تواصل معنا
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-5 space-x-reverse">
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={`/profile/${user.id}`}
                    className="flex items-center gap-4 space-x-reverse text-sm text-gray-700 shadow p-2 px-4 cursor-pointer"
                  >
                    <Image
                      src="/assets/person.svg"
                      alt="avatar"
                      width={20}
                      height={40}
                    />
                    <span className="">
                      أهلاً بك {getFirstName(user.fullName)}
                    </span>
                  </Link>
                  <Logout />
                </div>
              ) : (
                !hideLogin && (
                  <Link href="/login">
                    <Button className="cursor-pointer">تسجيل الدخول</Button>
                  </Link>
                )
              )}
            </>
          </div>
        </div>
      </div>
    </header>
  );
}
