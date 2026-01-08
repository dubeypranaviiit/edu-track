"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

export function useSyncUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { profile, setProfile, clearProfile } = useUserStore();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      clearProfile();
      return;
    }
    if (profile?.clerkId === user.id) return;

    const clerkId = user.id;

    const syncUser = async () => {
      try {
  
        const res = await axios.get(`/api/users/${clerkId}`);
        setProfile(res.data);
      } catch (err: any) {
        
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          const newUser = {
            clerkId,
            name: user.fullName || user.firstName || "Unnamed User",
            email: user.primaryEmailAddress?.emailAddress || "",
            avatar: user.imageUrl || "",
          };
          const createRes = await axios.post("/api/users", newUser);
          setProfile(createRes.data);
        } else {
          console.error("Error syncing user:", err);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, profile, setProfile, clearProfile]);
}
