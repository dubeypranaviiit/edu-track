"use client";
import { UserButton } from "@clerk/nextjs";
import { FiMenu } from "react-icons/fi";

type Props = {
  title: string;
  onMenuClick: () => void;
};

const CourseHeader = ({ title, onMenuClick }: Props) => {
  return (
    <header className="sticky top-0   py-4 px-6 flex items-center justify-between">
      <button onClick={onMenuClick} className="lg:hidden mr-2">
        <FiMenu className="h-6 w-6" />
      </button>

      <h1 className="flex-1 text-center text-lg sm:text-xl font-bold truncate">{title}</h1>

      <div className="ml-4 relative">
        <UserButton />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
      </div>
    </header>
  );
};

export default CourseHeader;
