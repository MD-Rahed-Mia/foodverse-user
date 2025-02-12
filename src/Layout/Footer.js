import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { MdShoppingBag, MdShoppingCart } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { HiOutlineHome, HiMenu } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useCartContext } from "../contexts/CartContext";
import { IoMdHome } from "react-icons/io";
import { FaHeart, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

function Footer() {
  const { cart, activeOrderCount, favoriteMenus } = useCartContext();

  const pathname = window.location.pathname;

  useEffect(() => {
    console.log("pathname is : ", pathname);
  }, [pathname]);

  return (
    <>
      {/* footer section */}
      <footer className="bg-white fixed bottom-0 left-0 w-full p-2 flex justify-around items-center border-t">
        {/* Home Icon */}
        <Link to="/Home">
          {pathname.startsWith("/Home") || pathname === "/" ? (
            <IoMdHome className="size-7 text-blue-600" />
          ) : (
            <HiOutlineHome className="size-7 text-blue-600" />
          )}
        </Link>
        {/* Favorites Icon */}
        <Link to="/Favorites" className="mr-5 relative">
          {favoriteMenus && favoriteMenus.length > 0 ? (
            <span className="absolute top-0 right-0 bg-blue-500 text-[11px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white">
              {favoriteMenus && favoriteMenus.length}
            </span>
          ) : null}

          {pathname.startsWith("/Favorites") ? (
            <FaHeart className="size-7 text-blue-600" />
          ) : (
            <FiHeart className="size-7 text-slate-600" />
          )}
        </Link>

        {/* Cart Icon */}
        <Link
          to="/Cart"
          className="bg-gradient-to-r from-purple-100 to-blue-100 p-2 rounded-full absolute -top-6
       shadow-xl"
        >
          {cart && cart.length > 0 ? (
            <span className="absolute top-0 right-0 bg-blue-500 text-[11px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white">
              {cart && cart.length}
            </span>
          ) : null}
          {pathname.startsWith("/Cart") ? (
            <FaShoppingCart className="size-7 text-blue-600" />
          ) : (
            <MdShoppingCart className="size-8 text-purple-600" />
          )}
        </Link>

        {/* Order Icon */}
        <Link to="/order/active" className="ml-5 relative">
          {activeOrderCount > 0 ? (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-[11px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white">
              {activeOrderCount}
            </span>
          ) : null}

          {pathname.startsWith("/order/") ? (
            <MdShoppingBag className="size-7 text-blue-600" />
          ) : (
            <MdOutlineShoppingBag className="size-7 text-slate-600" />
          )}
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
