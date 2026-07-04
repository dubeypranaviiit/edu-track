'use client';

import { useState, useEffect } from 'react';
import { useUser, SignedIn } from '@clerk/nextjs';
import Image from 'next/image';
import {
  FiEdit2,
  FiUpload,
  FiBriefcase,
  FiBook,
  FiUsers,
  FiAward,
} from 'react-icons/fi';

interface UserData {
  fullName: string;
  role: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  department: string;
  subjectsTaught: string[];
  qualifications: string;
  experience: string;
  achievements: string[];
}

const page = () => {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(""
    // 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  );

  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    role: 'Instructor',
    dateOfBirth: '1985-06-15',
    email: 'john.doe@school.edu',
    phone: '+1 (555) 123-4567',
    department: 'Mathematics',
    subjectsTaught: ['Advanced Calculus', 'Statistics', 'Algebra'],
    qualifications: 'Ph.D. in Mathematics',
    experience: '12 years',
    achievements: ['Best Teacher Award 2022', 'Published Research Paper', 'Department Head'],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    // You can add PUT request here to save changes
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Teacher Profile</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Profile Card */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <div className="relative w-36 h-36 mx-auto mb-6">
                <Image
                  src={profileImage}
                  alt="Profile"
                  layout="fill"
                  className="rounded-full object-cover"
                />
                <label
                  htmlFor="upload"
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600"
                >
                  <FiUpload className="text-white" />
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">{userData.fullName}</h2>
                <p className="text-blue-500">{userData.role}</p>
              </div>
              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>DOB:</strong> {userData.dateOfBirth}</p>
              </div>
            </div>

            {/* Right Info Form */}
            <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Professional Information</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  <FiEdit2 /> {editMode ? 'Save' : 'Edit'}
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={userData.department}
                      disabled={!editMode}
                      className="w-full p-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                    <input
                      type="text"
                      value={userData.experience}
                      disabled={!editMode}
                      className="w-full p-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
                  <input
                    type="text"
                    value={userData.qualifications}
                    disabled={!editMode}
                    className="w-full p-2 border rounded-md bg-gray-50 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Taught</label>
                  <div className="flex flex-wrap gap-2">
                    {userData.subjectsTaught.map((subject, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
                  <ul className="space-y-2 text-sm">
                    {userData.achievements.map((ach, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <FiAward className="text-yellow-500" /> {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SignedIn>
  );
};

export default page;
