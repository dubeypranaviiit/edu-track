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

  const { isLoaded, isSignedIn } = useUser();
  const { profile } = useUserStore(); 
  const role = profile?.role ?? "student"; 

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
              <div className="flex gap-4">
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
    </header>
  );
};

export default Header;
