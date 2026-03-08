import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-techBlack border-t border-techGray/50 mt-20 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-techElectric/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
            <div className="text-3xl font-extrabold tracking-tight text-techWhite mb-6 inline-block relative">
              TechPlace
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-techElectric shadow-neon"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light mb-8 max-w-sm">
              We engineer premium digital experiences. Seamless integrations, uncompromising fidelity, and visionary design for the modern innovator.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-techWhite/5 border border-techGray hover:bg-techElectric hover:border-techElectric hover:shadow-neon transition-all duration-300 group">
                <Image src={assets.instagram_icon} alt="Instagram" className="w-4 h-4 opacity-50 group-hover:opacity-100 filter brightness-0 invert transition-opacity" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-techWhite/5 border border-techGray hover:bg-techElectric hover:border-techElectric hover:shadow-neon transition-all duration-300 group">
                <Image src={assets.twitter_icon} alt="Twitter" className="w-4 h-4 opacity-50 group-hover:opacity-100 filter brightness-0 invert transition-opacity" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center bg-techWhite/5 border border-techGray hover:bg-techElectric hover:border-techElectric hover:shadow-neon transition-all duration-300 group">
                <Image src={assets.facebook_icon} alt="Facebook" className="w-4 h-4 opacity-50 group-hover:opacity-100 filter brightness-0 invert transition-opacity" />
              </a>
            </div>
          </div>

          {/* Spacer for Desktop */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Shop */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-techWhite font-semibold tracking-wide uppercase text-xs mb-6 opacity-80">Shop</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Acoustics</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Computing</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Wearables</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-techWhite font-semibold tracking-wide uppercase text-xs mb-6 opacity-80">Support</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Contact Us</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Order Status</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Returns</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 flex flex-col">
            <h3 className="text-techWhite font-semibold tracking-wide uppercase text-xs mb-6 opacity-80">Company</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">About TechPlace</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Careers</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Press & Media</Link></li>
              <li><Link href="/" className="text-sm text-gray-400 hover:text-techWhite transition-colors duration-300">Sustainability</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-techGray/30 bg-techGraphite/20">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-32 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            © 2026 TechPlace Inc. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs text-gray-500 hover:text-techWhite transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-xs text-gray-500 hover:text-techWhite transition-colors">Terms of Service</Link>
            <Link href="/" className="text-xs text-gray-500 hover:text-techWhite transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;