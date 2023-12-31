"use client";

import { ThemeContext } from "@/providers/ThemeProvider";
import Link from "next/link";
import React, { useContext } from "react";

const Navbar = () => {
  const { themeToggle } = useContext(ThemeContext);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 sticky w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >
            <span className="text-blue-700">Our</span>Vocab
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-4 items-center">
            <label className="relative inline-flex  cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={themeToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
