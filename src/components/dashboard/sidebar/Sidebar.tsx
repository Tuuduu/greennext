"use client";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Profile from "./Profile";
import Menu from "./Menu";
import SignoutButton from "./SignoutButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Menu toggle button (Only visible on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-full shadow-lg focus:outline-none md:hidden"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-[300px] lg:w-[350px]`}
      >
        {/* Profile and Menu Section */}
        <div className="flex flex-col gap-y-8 pt-10 px-4">
          <Profile />
          <Menu />
        </div>

        {/* Signout Button Section */}
        <div className="pb-6 px-4">
          <SignoutButton />
        </div>
      </div>

      {/* Overlay for small screens */}
      {/* {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        ></div>
      )} */}
    </div>
  );
};

export default Sidebar;
