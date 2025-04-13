
import React from "react";
import { MdDashboard } from "react-icons/md";

type NavItem = {
  id: string;
  icon: React.ElementType;
  label: string;
};

type SidebarProps = {
  isOpen: boolean;
  active: string;
  setActive: (id: string) => void;
  toggleSidebar: () => void;
  navItems: NavItem[]; 
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  active,
  setActive,
  toggleSidebar,
  navItems, 
}) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-white dark:bg-gray-800 shadow-md transition-all`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`${
            isOpen ? "block" : "hidden"
          } text-xl font-bold text-gray-800 dark:text-white`}
        >
          Dashboard
        </h1>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700"
        >
          <MdDashboard />
        </button>
      </div>
      <nav className="mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center w-full p-4 text-left transition ${
              active === item.id
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <item.icon />
            {isOpen && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

