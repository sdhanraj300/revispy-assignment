import { Search, ShoppingCart, Menu, X } from 'lucide-react';  // Add Menu and X icons
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control the hamburger menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the menu state
  };

  return (
    <div className="flex flex-col">
      {/* Top Bar (Help, Order & Returns, Hi, John) */}
      <div className="px-10 mt-1">
        <ul className="flex justify-end gap-4 font-medium text-sm">
          <li>Help</li>
          <li>Order & Returns</li>
          <li>Hi, John</li>
        </ul>
      </div>

      {/* Main Navbar */}
      <div className="flex px-10 mt-5 items-center flex-wrap sm:flex-nowrap">
        {/* Left side: Logo */}
        <div className="">
          <Link href="/">
            <h1 className="text-3xl font-bold">ECOMMERCE</h1>
          </Link>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6" /> // Close icon
            ) : (
              <Menu className="w-6 h-6" /> // Hamburger icon
            )}
          </button>
        </div>

        {/* Center: Navbar Links for Larger Screens */}
        <ul className="hidden sm:flex flex-1 justify-center gap-10 font-semibold">
          <Link className="cursor-pointer hover:underline" href="/protected">
            <li>Categories</li>
          </Link>
          <li>Sale</li>
          <li>Clearance</li>
          <li>New Stock</li>
          <li>Trending</li>
        </ul>

        {/* Right side: Search & Cart Icons */}
        <div className="flex gap-5 items-center">
          <Search className="cursor-pointer" />
          <ShoppingCart className="cursor-pointer" />
        </div>
      </div>

      {/* Mobile Menu (Shown only when the hamburger menu is open) */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col items-center mt-4 gap-4">
          <Link className="cursor-pointer hover:underline" href="/protected">
            Categories
          </Link>
          <Link className="cursor-pointer hover:underline" href="#">
            Sale
          </Link>
          <Link className="cursor-pointer hover:underline" href="#">
            Clearance
          </Link>
          <Link className="cursor-pointer hover:underline" href="#">
            New Stock
          </Link>
          <Link className="cursor-pointer hover:underline" href="#">
            Trending
          </Link>
        </div>
      )}

      {/* Bottom Bar: Promo Banner */}
      <div className="flex justify-center items-center text-md py-2 mt-5 bg-gray-100 text-gray-700">
        <span> {"<"} Get 10% Off on business sign up {">"} </span>
      </div>
    </div>
  );
};

export default Navbar;
