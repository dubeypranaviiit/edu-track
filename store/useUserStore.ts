import { create } from "zustand";
import axios from "axios";

interface SocialLinks {
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}
export interface UserProfile {
  _id?: string; 
  clerkId: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  dateOfBirth?: string;
  socialLinks?: SocialLinks;
  role?: "student" | "instructor" | "admin";
}
interface UserStore {
  profile: UserProfile | null;
  loading: boolean;
  fetchProfile: (clerkId: string) => Promise<void>;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  setProfile: (profile: UserProfile | null) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  profile: null,
  loading: false,
  fetchProfile: async (clerkId: string) => {
    if (get().profile?.clerkId === clerkId) return; 

    set({ loading: true });
    try {
      const res = await axios.get(`/api/users/${clerkId}`);
      set({ profile: res.data });
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      set({ loading: false });
    }
  },
  updateProfile: async (updatedData) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    try {
      const res = await axios.put(`/api/users/${currentProfile.clerkId}`, updatedData);
      set({ profile: res.data });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  },

  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
