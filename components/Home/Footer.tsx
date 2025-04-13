import React from "react";
import Link from "next/link";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* About / Branding */}
        <div>
          <h4 className="text-lg font-semibold mb-4">EduPro</h4>
          <p className="text-gray-400">Empowering learners and educators with cutting-edge tools, personalized learning, and community-driven progress.</p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/courses" className="text-gray-400 hover:text-blue-400 transition">Courses</Link></li>
            <li><Link href="/instructors" className="text-gray-400 hover:text-blue-400 transition">Instructors</Link></li>
            <li><Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition">Pricing</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/help-center" className="text-gray-400 hover:text-blue-400 transition">Help Center</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link href="/faq" className="text-gray-400 hover:text-blue-400 transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="https://twitter.com/" className="text-gray-400 hover:text-blue-400 transition" target="_blank"><FaTwitter size={20} /></Link>
            <Link href="https://linkedin.com/" className="text-gray-400 hover:text-blue-400 transition" target="_blank"><FaLinkedin size={20} /></Link>
            <Link href="https://facebook.com/" className="text-gray-400 hover:text-blue-400 transition" target="_blank"><FaFacebook size={20} /></Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 text-sm">© 2025 EduPro. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
