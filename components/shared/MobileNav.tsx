"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import Logout from "@/components/forms/Logout";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  user?: { id: string; fullName?: string | null } | null;
  hideLogin?: boolean;
}

export default function MobileNav({ user, hideLogin }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleServices = useCallback(
    () => setIsServicesOpen((prev) => !prev),
    []
  );

  return (
    <div className="md:hidden">
      <button
        aria-label="فتح القائمة"
        onClick={toggleMenu}
        className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        {isOpen ? (
          <Image src="/assets/x.svg" alt="إغلاق" width={24} height={24} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Overlay */}
      <div
        className={`${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed inset-0 z-40 bg-black/40 transition-opacity duration-200`}
        onClick={closeMenu}
      />

      {/* Slide-over panel */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 z-50 h-full w-full max-w-[70vw] bg-white shadow-lg transition-transform duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.svg" alt="Logo" width={32} height={32} />
            <span className="text-sm text-gray-600">مرقب</span>
          </div>
          <button
            aria-label="إغلاق القائمة"
            onClick={closeMenu}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Image src="/assets/x.svg" alt="إغلاق" width={20} height={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800"
          >
            الرئيسية
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800"
          >
            عن مرقب
          </Link>

          <button
            type="button"
            aria-expanded={isServicesOpen}
            aria-controls="mobile-services"
            onClick={toggleServices}
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 text-gray-900 font-medium"
          >
            <span>الخدمات</span>
            <Image
              src="/assets/arrow.svg"
              alt="toggle"
              width={16}
              height={10}
              className={`transition-transform duration-200 ${
                isServicesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <div
            id="mobile-services"
            className={`overflow-hidden transition-all duration-300 ${
              isServicesOpen ? "max-h-80 mt-1" : "max-h-0"
            }`}
          >
            <div className="pl-6 space-y-1">
              <Link
                href="/lands"
                onClick={closeMenu}
                className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                تتبع الأراضي
              </Link>
              <Link
                href="/subscription"
                onClick={closeMenu}
                className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                رخصة ملبي
              </Link>
              <Link
                href="/recommendation"
                onClick={closeMenu}
                className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                التوصيات
              </Link>
              <Link
                href="/alerts"
                onClick={closeMenu}
                className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
              >
                التنبيهات
              </Link>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-800 mt-2"
          >
            تواصل معنا
          </Link>
        </nav>

        <div className="mt-auto p-4 border-t">
          {user ? (
            <div className="space-y-3">
              <Link
                href={`/profile/${user.id}`}
                onClick={closeMenu}
                className="flex items-center gap-3 px-3 py-2 rounded border hover:bg-gray-50 text-gray-800"
              >
                <Image
                  src="/assets/person.svg"
                  alt="avatar"
                  width={18}
                  height={18}
                />
                <span>الملف الشخصي</span>
              </Link>
              <Logout className="w-full" />
            </div>
          ) : (
            !hideLogin && (
              <Link href="/login" onClick={closeMenu}>
                <Button className="w-full">تسجيل الدخول</Button>
              </Link>
            )
          )}
        </div>
      </aside>
    </div>
  );
}
