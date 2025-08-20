import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-white bg-primary-dark w-full px-8 py-8">
      <div className="grid lg:grid-cols-3 max-w-7xl mx-auto gap-10 w-full">
        <div>
          <h3 className="text-white font-medium text-2xl pb-2 border-b mb-2 border-b-white w-full">
            ملخص
          </h3>
          <ul className="text-white flex flex-col gap-2 ">
            <li>
              <Link href="#" className="text-sm">
                حول مرقب
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                الخصوصية و شروط الاستخدام
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                كيفية استخدام مرقب
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium text-2xl pb-2 border-b mb-2 border-b-white w-full">
            روابط مهمة
          </h3>
          <ul className="text-white flex flex-col gap-2 ">
            <li>
              <Link href="/" className="text-sm">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                تواصل معنا
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm">
                الأسئلة الشائعة
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium text-2xl pb-2 border-b mb-2 border-b-white w-full">
            تابعنا
          </h3>
          <ul className="text-white flex gap-2 ">
            <li>
              <Link
                href="#"
                className="text-sm block w-fit border border-white p-2 rounded-md"
              >
                <Image
                  src="/assets/instagram.svg"
                  alt="instagram"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm block w-fit border border-white p-2 rounded-md"
              >
                <Image
                  src="/assets/linkedin.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-sm block w-fit border border-white p-2 rounded-md"
              >
                <Image
                  src="/assets/x.svg"
                  alt="x logo"
                  width={20}
                  height={20}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 max-w-7xl mx-auto">
        <p className="text-lg">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لمرقب
        </p>
        <Image src="/assets/logo.svg" alt="logo" width={100} height={100} />
      </div>
    </footer>
  );
};

export default Footer;
