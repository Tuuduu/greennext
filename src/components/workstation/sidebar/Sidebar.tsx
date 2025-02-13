"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Profile from "./Profile";
import Menu from "./Menu";
import SignoutButton from "./SignoutButton";
import ThemeToggle from "@/components/firstpage/ThemeToggle";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen relative z-50">
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      {/* Menu toggle button (Mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-full shadow-lg focus:outline-none md:hidden"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[280px] lg:w-[320px]`}
      >
        {/* Profile and Menu Section */}
        <div className="flex flex-col gap-y-1 2xl:gap-y-6 pt-4 2xl:pt-12 px-6">
          {/* Profile Section */}
          <Profile />

          {/* Menu Section */}
          <Menu />
        </div>

        {/* Signout Button Section */}
        <div className="pb-8 px-6">
          <SignoutButton />
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
