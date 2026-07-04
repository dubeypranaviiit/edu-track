import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/user";
import { connectDB } from "@/lib/mongoose";
import { ReactNode } from "react";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();
  const user = await User.findOne({ clerkId: userId });
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {/* Sidebar Nav */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:block shrink-0 py-6">
        <div className="px-6 mb-6">
          <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Admin Panel
          </h2>
        </div>
        <AdminSidebarNav />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
