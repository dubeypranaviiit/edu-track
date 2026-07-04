"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  CreditCard, 
  Mail,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/instructors", label: "Instructor Requests", icon: UserCheck },
  { href: "/admin/courses", label: "Manage Courses", icon: BookOpen },
  { href: "/admin/payments", label: "Payment History", icon: CreditCard },
  { href: "/admin/contacts", label: "Contact Inbox", icon: Mail },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-4 pb-4">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
              isActive 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Icon className={cn("size-4 shrink-0 transition-transform duration-200 group-hover:scale-110", isActive ? "text-white" : "text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400")} />
            <span>{link.label}</span>
            {isActive && (
              <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
