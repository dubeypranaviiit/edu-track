"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, ChevronRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 shadow-xs rounded-2xl mb-6">
      {}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden cursor-pointer"
          onClick={onMenuClick}
        >
          <Menu className="size-5" />
        </Button>

        <nav className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
          <span className="hover:text-slate-800 dark:hover:text-white transition-colors">Admin</span>
          {paths.slice(1).map((path, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              <span className="capitalize text-slate-800 dark:text-white font-semibold">
                {path.replace("-", " ")}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative rounded-full text-slate-500 dark:text-slate-400 cursor-pointer">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 bg-blue-600 rounded-full ring-2 ring-white dark:ring-slate-800" />
        </Button>

        <div className="border-l border-slate-200 dark:border-slate-700 h-5" />

        <UserButton 
          afterSignOutUrl="/" 
          appearance={{
            elements: {
              avatarBox: "size-8 rounded-full border border-slate-200 dark:border-slate-700"
            }
          }}
        />
      </div>
    </header>
  );
}
