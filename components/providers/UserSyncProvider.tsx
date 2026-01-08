"use client";

import { useSyncUser } from "@/lib/hooks/useSyncUser";

export default function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncUser();
  return <>{children}</>;
}
