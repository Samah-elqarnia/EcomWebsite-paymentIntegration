"use client"
import React from "react";
import { assets, BagIcon, CartIcon, HomeIcon, BoxIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();

  return (
    <nav className="absolute top-0 w-full z-50 bg-gradient-to-b from-techBlack/80 to-transparent transition-all duration-300">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 h-20 max-w-7xl mx-auto">
        <div
          className="cursor-pointer text-1xl font-bold tracking-tight text-techWhite transition-transform hover:scale-105 duration-300 relative z-10"
          onClick={() => router.push('/')}
        >
          TechPlace
        </div>

        <div className="flex items-center gap-6 lg:gap-10 max-md:hidden text-sm font-medium text-gray-300">
          <Link href="/" className="hover:text-techElectric transition-colors duration-200">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-techElectric transition-colors duration-200">
            Store
          </Link>

          <Link href="/" className="hover:text-techElectric transition-colors duration-200">
            Contact
          </Link>

          {isSeller && <button onClick={() => router.push('/seller')} className="ml-4 text-xs font-semibold text-techElectric border border-techElectric/30 px-5 py-2 rounded-full hover:bg-techElectric hover:text-techWhite transition-all duration-300 shadow-sm hover:shadow-neon">Seller Dashboard</button>}
        </div>

        <ul className="hidden md:flex items-center gap-5">
          <button className="p-2 bg-techWhite/5 hover:bg-techWhite/10 backdrop-blur-md rounded-full transition-colors group">
            <Image className="w-5 h-5 opacity-70 group-hover:opacity-100 filter brightness-0 invert transition" src={assets.search_icon} alt="search icon" />
          </button>
          {isSignedIn
            ? <div className="h-10 w-10 flex items-center justify-center rounded-full border border-techGray/50 overflow-hidden shadow-sm hover:shadow-neon transition">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-full h-full" } }}>
                <UserButton.MenuItems>
                  <UserButton.Link label="Home" labelIcon={<HomeIcon />} href="/" />
                  <UserButton.Link label="Products" labelIcon={<BoxIcon />} href="/all-products" />
                  <UserButton.Link label="My Cart" labelIcon={<CartIcon />} href="/cart" />
                  <UserButton.Link label="My Orders" labelIcon={<BagIcon />} href="/my-orders" />
                </UserButton.MenuItems>
              </UserButton>
            </div>
            : <button onClick={openSignIn} className="flex items-center gap-2 px-5 py-2.5 bg-techElectric text-techWhite rounded-full text-sm font-medium hover:bg-techNeon hover:shadow-neon transition-all transform hover:-translate-y-0.5">
              Sign In
            </button>}
        </ul>

        <div className="flex items-center md:hidden gap-4">
          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs font-semibold bg-techWhite/10 text-techWhite border border-techWhite/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">Dashboard</button>}
          {isSignedIn
            ? <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link label="Home" labelIcon={<HomeIcon />} href="/" />
                <UserButton.Link label="Products" labelIcon={<BoxIcon />} href="/all-products" />
                <UserButton.Link label="My Cart" labelIcon={<CartIcon />} href="/cart" />
                <UserButton.Link label="My Orders" labelIcon={<BagIcon />} href="/my-orders" />
              </UserButton.MenuItems>
            </UserButton>
            : <button onClick={openSignIn} className="flex items-center justify-center p-2 rounded-full bg-techElectric text-techWhite hover:shadow-neon transition-shadow">
              <Image src={assets.user_icon} alt="user icon" className="w-5 h-5 filter brightness-0 invert" />
            </button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;