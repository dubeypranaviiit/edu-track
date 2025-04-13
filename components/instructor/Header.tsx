import { UserButton } from "@clerk/nextjs";
import React from "react";
import { FaSun, FaMoon, FaBell } from "react-icons/fa";

type HeaderProps = {
 role:string;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ role}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{role} Dashboard </h1>
        <UserButton />
    </header>
  );
};

export default Header;
{/* <div className="flex items-center space-x-4">
<UserButton />
</div> */}