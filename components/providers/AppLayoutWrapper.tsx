"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-grow flex-1">{children}</main>
      <Footer />
    </div>
  );
}
