import { assets } from "@/public/assets/assets";
import Image from "next/image";

const ContactBanner = () => {
    return (
      <div className="relative h-96">
        <Image
          src={assets.banner1} 
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/40 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Our Education Experts
          </h1>
          <p className="text-lg max-w-2xl">
            We're here to help you achieve your educational goals. Our support team is available 24/7.
          </p>
        </div>
      </div>
    );
  };
  
  export default ContactBanner;
  
  