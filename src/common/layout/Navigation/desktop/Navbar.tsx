"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import Logo from "../../../../../public/Logo2.png";
import { NavLink } from "@/common/ui/NavLink";

export const Navbar: React.FC = () => {
  return (
    <nav className="absolute max-lg:hidden top-0 left-0 w-full z-50 py-6">
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <NavLink
            href="/"
            variant="icon"
            className="bg-white/10 backdrop-blur-sm text-primary-300 w-10 h-10 border border-white/10 rounded-xl"
          >
            <Image src={Logo} alt="Shahin" className="w-6 h-7" />
          </NavLink>
        </div>

        <div className="hidden md:flex flex-1 backdrop-blur-sm border bg-white/5 border-white/15 shadow-lg shadow-black/20 overflow-hidden rounded-full max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch size={20} className="text-gray-400 w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full text-white placeholder-gray-400 text-sm rounded-full py-2.5 pl-11 pr-4 focus:outline-none transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            href="/order"
            variant="solid"
            loadingText="Ordering..."
            className="bg-[#C49A6C] hover:bg-[#b08a5f] text-black font-medium rounded-xl px-4 py-2 h-10 w-fit"
          >
            Order Now
            <BsArrowRight className="w-5 h-5" />
          </NavLink>

          <NavLink
            href="/history"
            variant="icon"
            className="bg-white/10 backdrop-blur-sm text-primary-300 w-10 h-10 border border-white/10 rounded-xl"
          >
            <BiTimeFive className="w-6 h-6" />
          </NavLink>

          <button className="bg-white/10 backdrop-blur-sm text-primary-300 w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center relative">
            <FiShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#C49A6C] text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full z-10">
              2
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
