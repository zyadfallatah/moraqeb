import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/authActions";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logout from "../forms/Logout";

export default async function Header({ hideLogin }: { hideLogin?: boolean }) {
  // const { user, logout, isLoading } = useAuth();
  const user = await getCurrentUser();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                الخدمات
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 font-medium"
              >
                تواصل معنا
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-5 space-x-reverse">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Search className="w-4 h-4 ml-2" />
              البحث
            </Button>

            <>
              {user ? (
                <div className="flex items-center gap-4 space-x-reverse">
                  <span className="text-sm text-gray-700">
                    مرحباً، {user.name}
                  </span>
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
