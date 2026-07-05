import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/user";
import { connectDB } from "@/lib/mongoose";
import { ReactNode } from "react";
import AdminLayoutShell from "@/components/admin/AdminLayoutShell";

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
    <AdminLayoutShell>
      {children}
    </AdminLayoutShell>
  );
}
