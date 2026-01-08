"use client";

import { useEffect, ChangeEvent, FormEvent, useState } from "react";
import { useUser, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { FiEdit2, FiUpload } from "react-icons/fi";
import { useUserStore } from "@/store/useUserStore";

export default function StudentProfile() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { profile, loading, fetchProfile, updateProfile, setProfile } = useUserStore();
  const [editMode, setEditMode] = useState(false);

  // Fetch profile only once if clerkId exists
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;
    if (!profile || profile.clerkId !== user.id) {
      fetchProfile(user.id);
    }
  }, [isLoaded, isSignedIn, user?.id, profile, fetchProfile]);

  if (loading) return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  if (!profile) return <div className="text-center mt-20 text-gray-600">No profile found.</div>;

  const handleChange = (field: keyof typeof profile, value: any) => {
    // Live update in Zustand store
    setProfile({ ...profile, [field]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => handleChange("avatar", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateProfile(profile); // Sync changes with backend
    setEditMode(false);
  };

  return (
    <SignedIn>
      <div className="min-h-screen flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 bg-white">
        <div className="w-full max-w-5xl backdrop-blur-xl border-gray-200 bg-white rounded-2xl shadow-2xl p-8 sm:p-10 transition-all duration-300">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="relative group w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-md transition-all duration-300">
              <Image
                src={profile.avatar || "/default-avatar.png"}
                alt="Avatar"
                fill
                className="object-cover"
              />
              <label className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <FiUpload className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{profile.name || "Unnamed User"}</h1>
              <p className="text-gray-600 dark:text-gray-400">{profile.email || "No email"}</p>
              <button
                onClick={() => setEditMode(!editMode)}
                className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                <FiEdit2 /> {editMode ? "Finish Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Full Name"
                value={profile.name || ""}
                placeholder="Enter your full name"
                disabled={!editMode}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <FormField
                label="Phone"
                value={profile.phone || ""}
                placeholder="Enter your phone"
                disabled={!editMode}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <FormField
                label="Date of Birth"
                type="date"
                value={profile.dateOfBirth || ""}
                disabled={!editMode}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
              <FormField
                label="Bio"
                type="textarea"
                value={profile.bio || ""}
                placeholder="Tell us about yourself"
                disabled={!editMode}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">🌐 Social Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["website", "twitter", "linkedin", "github"].map((key) => (
                  <FormField
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={profile.socialLinks?.[key as keyof typeof profile.socialLinks] || ""}
                    placeholder={`Enter your ${key}`}
                    disabled={!editMode}
                    onChange={(e) =>
                      handleChange("socialLinks", {
                        ...profile.socialLinks,
                        [key]: e.target.value,
                      })
                    }
                  />
                ))}
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                  💾 Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </SignedIn>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}

function FormField({ label, value, onChange, type = "text", disabled, placeholder }: FormFieldProps) {
  const baseClass =
    "w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition";
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} rows={3} className={baseClass} />
      ) : (
        <input type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} className={baseClass} />
      )}
    </div>
  );
}
