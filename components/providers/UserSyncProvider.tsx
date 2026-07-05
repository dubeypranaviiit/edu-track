"use client";

import { useSyncUser } from "@/lib/hooks/useSyncUser";
import { useUserStore } from "@/store/useUserStore";
import { SignOutButton } from "@clerk/nextjs";

export default function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncUser();
  const { profile } = useUserStore();

  if (profile && profile.isActive === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
        <div className="max-w-md w-full text-center space-y-6 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="size-16 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-700/50">
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Account Suspended</h2>
            <p className="text-slate-400 text-sm">
              Your account has been suspended by an administrator. You no longer have access to the platform services.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-700/50">
            <SignOutButton>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl transition-colors cursor-pointer">
                Log Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
