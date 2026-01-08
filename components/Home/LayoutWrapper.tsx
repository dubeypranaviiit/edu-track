
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderPaths = ["/login", "/register", "/dashboard", "/test"];

  const shouldHideHeader = hideHeaderPaths.includes(pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      <Footer />
    </>
  );
}
