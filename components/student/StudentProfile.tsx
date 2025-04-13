'use client';

import { useState } from 'react';
import { useUser, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import { FiEdit2, FiUpload } from 'react-icons/fi';

const StudentProfile = () => {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');

  const [basicInfo, setBasicInfo] = useState({
    fullName: user?.fullName || 'Student Name',
    email: user?.emailAddresses[0]?.emailAddress || 'student@email.com',
    phone: '+1 (555) 000-0000',
    dateOfBirth: '2000-01-01',
    bio: 'Passionate learner pursuing knowledge in web development. i want to learn all new technology',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
        <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative w-28 h-28">
              <Image
                src={profileImage || '/default-avatar.png'}
                alt="Profile"
                layout="fill"
                className="rounded-full object-cover"
              />
              <label htmlFor="upload" className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer">
                <FiUpload className="text-white" />
                <input type="file" id="upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{basicInfo.fullName}</h2>
              <p className="text-gray-500 dark:text-gray-400">{basicInfo.email}</p>
              <button
                onClick={() => setEditMode(!editMode)}
                className="mt-2 flex items-center gap-2 text-blue-600 hover:underline"
              >
                <FiEdit2 /> {editMode ? 'Finish Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={basicInfo.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                disabled={!editMode}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={basicInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!editMode}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={basicInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                disabled={!editMode}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={basicInfo.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                disabled={!editMode}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={basicInfo.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                disabled={!editMode}
                rows={3}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
              ></textarea>
            </div>

            {editMode && (
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </SignedIn>
  );
};

export default StudentProfile;
