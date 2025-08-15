import React from "react";
import Link from "next/link";

const NotSignup = () => {
  return (
    <div className="bg-[#FAFAFC] shadow ">
      <Link href="/login">يرجى تسجيل الدخول</Link>
    </div>
  );
};

export default NotSignup;
