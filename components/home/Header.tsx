"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState("");

  const { isLoaded, isSignedIn } = useUser();
  const { profile } = useUserStore(); 
  const role = profile?.role ?? "student"; 

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(label);
    setTimeout(() => setCopiedEmail(""), 2000);
  };

  const renderLinks = () => {
    const links = [
      { href: "/", label: "Home" },
      { href: "/course", label: "Course" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/test", label: "Test" }, 
    ];

    if (isSignedIn) {
      if (profile) {
        if (role === "admin") {
          links.push({ href: "/admin", label: "Dashboard" });
          links.push({ href: "/admin/users", label: "Manage Users" });
        } else if (role === "instructor") {
          links.push({ href: "/instructor/dashboard", label: "Dashboard" });
        } else {
          links.push({ href: "/dashboard", label: "Dashboard" });
        }
      } else {
        links.push({ href: "/dashboard", label: "Dashboard" });
      }
    }

    return links;
  };

  const links = renderLinks();

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
       
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-blue-600">EduTrack</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 cursor-pointer">
            {links.map((link) => {
              if (link.label === "Test") {
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <DropdownMenu open={dropdownOpen}>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-700 hover:text-blue-600 transition-colors">
                          Test
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="mt-2">
                        <DropdownMenuItem asChild>
                          <Link href="/test/free">Free Tests</Link>
                        </DropdownMenuItem>
                       
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}

            {!isLoaded ? (
              <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
            ) : isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setShowDemo(true)}
                  className="border border-purple-500 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition cursor-pointer text-sm font-medium"
                >
                  🎯 Demo
                </button>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </nav>

          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? "0%" : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 space-y-4 md:hidden z-50"
        >
          <button
            className="absolute top-4 right-4 text-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            <FiX size={24} />
          </button>

          {links.map((link) => {
            if (link.label === "Test") {
              return (
                <div key={link.label} className="space-y-2 cursor-pointer">
                  <span className="block font-medium text-gray-700">Test</span>
                  <Link
                    href="/test/free"
                    className="block text-gray-600 ml-4 hover:text-blue-600"
                    onClick={() => setMenuOpen(false)}
                  >
                    Free Tests
                  </Link>
                
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          {!isLoaded ? (
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg" />
          ) : isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="space-y-2 cursor-pointer">
              <button
                onClick={() => { setShowDemo(true); setMenuOpen(false); }}
                className="w-full border border-purple-500 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition font-medium cursor-pointer"
              >
                🎯 Demo Access
              </button>
              <SignInButton mode="modal">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </motion.nav>
      </div>

      {showDemo && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-800">🎯 Demo Access</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Use these credentials to explore the app
                </p>
              </div>
              <button
                onClick={() => setShowDemo(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase">
                        Student
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-700 truncate">
                      student.demo@yopmail.com
                    </p>
                    <p className="text-sm font-mono text-gray-500 mt-0.5">
                      EduTrack@123
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy("student.demo@yopmail.com", "student")}
                    className="flex-shrink-0 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  >
                    {copiedEmail === "student" ? "✓ Copied" : "Copy Email"}
                  </button>
                </div>
              </div>

              <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full uppercase">
                        Instructor
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-700 truncate">
                      instructor.demo@mailinator.com
                    </p>
                    <p className="text-sm font-mono text-gray-500 mt-0.5">
                      EduTrack@123
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy("instructor.demo@mailinator.com", "instructor")}
                    className="flex-shrink-0 px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition cursor-pointer"
                  >
                    {copiedEmail === "instructor" ? "✓ Copied" : "Copy Email"}
                  </button>
                </div>
              </div>

              <div className="border border-purple-200 bg-purple-50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full uppercase">
                        Admin
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-700 truncate">
                      admin.demo@mailinator.com
                    </p>
                    <p className="text-sm font-mono text-gray-500 mt-0.5">
                      EduTrack@123
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy("admin.demo@mailinator.com", "admin")}
                    className="flex-shrink-0 px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition cursor-pointer"
                  >
                    {copiedEmail === "admin" ? "✓ Copied" : "Copy Email"}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">
                  Click <strong>Login</strong> → Enter email + password →{" "}
                  <strong>Sign in with email</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
