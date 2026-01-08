'use client';

import { useState } from 'react';
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaTelegramPlane,
  FaShareAlt,
} from 'react-icons/fa6';

const SocialShare = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full">
      {/* Main trigger is a button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-center items-center space-x-2 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer"
      >
        <FaShareAlt />
        <span>Share Course</span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg z-50">
          <div className="flex justify-between items-center gap-4 text-white">
            <button
              title="WhatsApp"
              onClick={() =>
                openInNewTab(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`)
              }
              className="hover:text-green-400"
            >
              <FaWhatsapp size={20} />
            </button>
            <button
              title="Facebook"
              onClick={() =>
                openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)
              }
              className="hover:text-blue-500"
            >
              <FaFacebookF size={20} />
            </button>
            <button
              title="X / Twitter"
              onClick={() =>
                openInNewTab(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)
              }
              className="hover:text-white"
            >
              <FaXTwitter size={20} />
            </button>
            <button
              title="LinkedIn"
              onClick={() =>
                openInNewTab(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)
              }
              className="hover:text-blue-400"
            >
              <FaLinkedinIn size={20} />
            </button>
            <button
              title="Telegram"
              onClick={() =>
                openInNewTab(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`)
              }
              className="hover:text-sky-400"
            >
              <FaTelegramPlane size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
