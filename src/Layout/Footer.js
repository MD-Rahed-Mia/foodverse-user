import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { MdShoppingCart } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiOutlineHome, HiMenu } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
function Footer() {
  return (
    <>
      {/* footer section */}
      <footer className="bg-white fixed bottom-0 left-0 w-full p-2 flex justify-around items-center border-t">
        {/* Home Icon */}
        <Link to="/Home">
          <HiOutlineHome className="size-7 text-blue-600" />
        </Link>
        {/* Favorites Icon */}
        <Link to="/Favorites" className="mr-5">
          <FiHeart className="size-7 text-slate-600" />
        </Link>

        {/* Cart Icon */}
        <Link
          to="/Cart"
          className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full absolute -top-6
       shadow-xl"
        >
          <MdShoppingCart className="size-8 text-purple-600" />
        </Link>

        {/* Order Icon */}
        <Link to="/order/active" className="ml-5">
          <MdOutlineShoppingBag className="size-7 text-slate-600" />
        </Link>

        {/* About Icon */}
        <Link to="/About">
          <HiMenu className="size-7 text-slate-600" />
        </Link>
      </footer>
    </>
  );
}

export default Footer;
