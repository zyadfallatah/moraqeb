import Header from "@/components/shared/Header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header hideLogin />
      {children}
    </>
  );
};

export default Layout;
