"use client";

import { ReactNode, useState } from "react";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";
import AdminHeader from "@/components/admin/AdminHeader";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayoutShell({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      {}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:block shrink-0 py-6">
        <div className="px-6 mb-6">
          <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Admin Panel
          </h2>
        </div>
        <AdminSidebarNav />
      </aside>

      {}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-slate-800 py-6 shadow-2xl">
            <div className="absolute right-4 top-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="cursor-pointer"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="px-6 mb-6">
              <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Admin Panel
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto" onClick={() => setIsMobileSidebarOpen(false)}>
              <AdminSidebarNav />
            </div>
          </div>
        </div>
      )}

      {}
      <div className="flex-grow flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {}
            <AdminHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

            {}
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
