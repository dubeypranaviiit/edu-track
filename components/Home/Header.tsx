// "use client";
// import { useAuth, SignInButton, SignUpButton, UserButton,useUser  } from "@clerk/nextjs";
// // import { UserButton, useUser } from "@clerk/nextjs";
// import React, { useState } from "react";
// import Link from "next/link";
// import { FiMenu, FiX } from "react-icons/fi";
// import { motion } from "framer-motion";

// const Header: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();
//  const [isLoggedIn,setIsLoggedIn]=useState(false);
//   // Get custom role from user.publicMetadata.role
//   const role = user?.publicMetadata?.role;

//   const renderLinks = () => {
//     const links = [
//       { href: "/", label: "Home" },
//       { href: "/about", label: "About" },
//       { href: "/course", label: "Course" },
//       { href: "/contact", label: "Contact" },
//     ];

//     if (role === "admin") {
//       links.push({ href: "/admin/dashboard", label: "Dashboard" });
//       links.push({ href: "/admin/users", label: "Manage Users" });
//     }

//     if (role === "instructor") {
//       links.push({ href: "/instructor/courses", label: "My Courses" });
//       links.push({ href: "/instructor/create", label: "Create Course" });
//     }

//     if (role === "student") {
//       links.push({ href: "/student/learning", label: "My Learning" });
//       links.push({ href: "/courses", label: "Browse Courses" });
//     }

//     return links;
//   };

//   const links = renderLinks();

//   return (
//     <header className="bg-white shadow-sm relative z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <span className="ml-2 text-xl font-bold text-blue-600">EduTrack</span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {links.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-gray-700 hover:text-blue-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <UserButton />
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-700 focus:outline-none"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Slide Menu */}
//         <motion.nav
//           initial={{ x: "100%" }}
//           animate={{ x: menuOpen ? "0%" : "100%" }}
//           exit={{ x: "100%" }}
//           transition={{ duration: 0.2, ease: "easeInOut" }}
//           className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 space-y-4 md:hidden z-50"
//         >
//           <button
//             className="absolute top-4 right-4 text-gray-700"
//             onClick={() => setMenuOpen(false)}
//           >
//             <FiX size={24} />
//           </button>

//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="block text-gray-700 hover:text-blue-600 transition-colors"
//               onClick={() => setMenuOpen(false)}
//             >
//               {link.label}
//             </Link>
//           ))}

//           {/* <UserButton /> */}
//           {isSignedIn ? (
//     <UserButton />
//   ) : (
//     <div className="space-y-2">
//       <SignInButton mode="modal">
//         <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Login</button>
//       </SignInButton>
//       <SignUpButton mode="modal">
//         <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg">Sign Up</button>
//       </SignUpButton>
//     </div>
//   )}
//         </motion.nav>
//       </div>
//     </header>
//   );
// };

// export default Header;
"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const role = user?.publicMetadata?.role ?? "student"; // default to student

  const renderLinks = () => {
    const links = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/course", label: "Course" },
      { href: "/contact", label: "Contact" },
    ];

    if (role === "admin") {
      links.push({ href: "/admin/dashboard", label: "Dashboard" });
      links.push({ href: "/admin/users", label: "Manage Users" });
    }

    if (role === "instructor") {
      links.push({ href: "/instructor/dashboard", label: "Dashboard" });
      
    }

    if (role === "student") {
      links.push({ href: "/dashboard", label: "Dashboard" });
      
    }

    return links;
  };

  const links = renderLinks();

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-blue-600">
              EduTrack
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-4">
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Slide Menu */}
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

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {isSignedIn ? (
            <UserButton />
          ) : (
            <div className="space-y-2">
              <SignInButton mode="modal">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg">
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
